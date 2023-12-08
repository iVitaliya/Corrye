// deno-lint-ignore-file no-explicit-any
import type { MessagePort } from "node:worker_threads";
import { Snowflake } from "../../../dapi-types/lib/DiscordAPITypes.ts";
import { SendPayload, WSWorkerData } from "../types/InternalWebSocket.ts";
import * as WS from "npm:ws";
import * as url from "node:url";
import * as zlb from "npm:zlib-sync";
import("../types/InternalWebSocket.ts");

let zlib: typeof zlb;

try {
	zlib = zlb;
} catch (_err) {
	// No compression
}

const UNRESUMABLE = [
	1000,
	4006,
	4007 /** InvalidSeq */
];

const UNRECOVERABLE = [
	4004 /* AuthenticationFailed */,
	4010 /* InvalidShard */,
	4011 /* ShardingRequired */,
	4013 /* InvalidIntents */,
	4014 /* DisallowedIntents */
];

export class WebSocketConnection {
	private parentPort: MessagePort;
	#options: WSWorkerData;
	/** The host url to connect to. */
	#host: string;
	/** The actual WebSocket connection. */
	#connection;
	/** The current sequence number. */
	#sequence: number;
	/** The sequence on WebSocket close. */
	#closeSequence: number;
	/** The current session ID. */
	#sessionID: Snowflake | number | null;
	/** Current ratelimit data. */
	#ratelimitData: {
		queue: unknown[];
		remaining: number;
	};
	/** The current heartbeat data. */
	#heartbeat: {
		acked: boolean;
		interval: number | null;
		last: number;
	};
	/** The zlib context to use when inflating data. */
	#zlib: typeof zlb | null;

	public constructor(parentPort: MessagePort, options: WSWorkerData) {
		this.parentPort = parentPort;
		this.#options = options;
		this.#host = this.resolveHost(this.#options.gatewayURL);
		this.#sequence = -1;
		this.#closeSequence = -1;
		this.#sessionID = null;
		this.#ratelimitData = {
			queue: [],
			remaining: 20
		};
		this.#heartbeat = {
			acked: true,
			interval: null,
			last: -1
		};
		this.#zlib = null;
		this.newWS();
	}

	/**
		* Adds a message to send to the WebSocket to the ratelimit queue.
		* @param payload The message to send.
		* @param important If the message should jump to the front of the line. */
	public queueWSPayload(payload: any, important = false) {
		const jsonString = JSON.stringify(payload);

		this.#ratelimitData.queue[important ? "unshift" : "push"](jsonString);
		this.processRatelimitQueue();
	}

	/** Gracefully closes the WebSocket connection. */
	public destroy({ closeCode: code, resetSession } = { closeCode: 1000, resetSession: false }) {
		this.setHeartbeatTimer(-1);

		try {
			this.#connection.close(code);
		} catch (_err) {
			// No-op
		}

		if (resetSession) {
			this.#sessionID = null;
			this.#sequence = this.#closeSequence - 1;
		}

		this.#ratelimitData.queue.length = 0;
		this.#ratelimitData.remaining = 120;
	}

	/**
		* Resolves the full host with query options
		* @param host The base host url */
	resolveHost(host: string) {
		const query = new url.URLSearchParams();

		query.set("v", this.#options.gatewayVersion.toString());
		if (zlib)
			query.set("compress", "zlib-stream");

		return `${host}/?${query.toString()}`;
	}
}
