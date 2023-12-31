import type { WSOptions } from "../lib/WebSocketManager.ts";
import { Intents } from "./Intents.ts";
import process from "node:process";
const WebSocketID = `@Corrye/ws v1.0.1; Deno/${Deno.version}`;

export const WSOptionsDefaults: Required<WSOptions> = {
	shards: "auto",
	totalShards: null,
	intents: Intents.DEFAULT,
	additionalOptions: {
		large_threshold: 250,
		properties: {
			$os: process.platform,
			$browser: WebSocketID,
			$device: WebSocketID,
		},
	},
	gatewayVersion: 10,
};
