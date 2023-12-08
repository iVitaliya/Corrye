import type {
	APIActivityData,
	APIChannelData,
	APIEmojiData,
	APIEmojiPartial,
	APIGuildData,
	APIGuildMemberData,
	APIGuildUnavailableData,
	APIInviteTargetType,
	APIMessageData,
	APIPresenceUpdateData,
	APIRoleData,
	APIUserData,
	APIVoiceState,
	Snowflake
} from "../../../dapi-types/lib/DiscordAPITypes.ts";
import type { WSOptions } from "../lib/WebSocketShard.ts";
import type { WebSocketShardStatus } from "../lib/WebSocketShard.ts";

export declare const enum WebSocketManagerEvents {
	Info = "info",
	Debug = "debug",
	Error = "error",
	ShardOnline = "shardOnline",
	ClientWSDebug = "wsDebug"
}

export declare const enum InternalActions {
	Debug = "DEBUG",
	Dispatch = "DISPATCH",
	Destroy = "DESTROY",
	Identify = "IDENTIFY",
	UpdatePing = "UPDATE_PING",
	ScheduleIdentify = "SCHEDULE_IDENTIFY",
	GatewayStatus = "GATEWAY_STATUS",
	CannotReconnect = "CANNOT_RECONNECT",
	ConnectionStatusUpdate = "CONNECTION_STATUS_UPDATE",
	PayloadDispatch = "PAYLOAD_DISPATCH",
	Reconnect = "RECONNECT",
	FetchSessionData = "FETCH_SESSION_DATA",
}

export declare const enum WSCloseCodes {
	UnknownError = 4000,
	UnknownOpCode = 4001,
	DecodeError = 4002,
	NotAuthenticated = 4003,
	AuthenticationFailed = 4004,
	AlreadyAuthenticated = 4005,
	InvalidSeq = 4007,
	RateLimited = 4008,
	SessionTimeout = 4009,
	InvalidShard = 4010,
	ShardingRequired = 4011,
	InvalidVersion = 4012,
	InvalidIntents = 4013,
	DisallowedIntents = 4014,
	ReconnectRequested = 4900
}

export declare const enum OpCodes {
	DISPATCH = 0,
	HEARTBEAT = 1,
	IDENTIFY = 2,
	STATUS_UPDATE = 3,
	VOICE_STATE_UPDATE = 4,
	RESUME = 6,
	RECONNECT = 7,
	REQUEST_GUILD_MEMBERS = 8,
	INVALID_SESSION = 9,
	HELLO = 10,
	HEARTBEAT_ACK = 11
}

export declare const enum WebSocketEvents {
	Ready = "READY",
	Resumed = "RESUMED",
	ChannelCreate = "CHANNEL_CREATE",
	ChannelUpdate = "CHANNEL_UPDATE",
	ChannelDelete = "CHANNEL_DELETE",
	ChannelPinsUpdate = "CHANNEL_PINS_UPDATE",
	GuildCreate = "GUILD_CREATE",
	GuildUpdate = "GUILD_UPDATE",
	GuildDelete = "GUILD_DELETE",
	GuildBanAdd = "GUILD_BAN_ADD",
	GuildBanRemove = "GUILD_BAN_REMOVE",
	GuildEmojisUpdate = "GUILD_EMOJIS_UPDATE",
	GuildIntegrationsUpdate = "GUILD_INTEGRATIONS_UPDATE",
	GuildMemberAdd = "GUILD_MEMBER_ADD",
	GuildMemberRemove = "GUILD_MEMBER_REMOVE",
	GuildMemberUpdate = "GUILD_MEMBER_UPDATE",
	GuildMembersChunk = "GUILD_MEMBERS_CHUNK",
	GuildRoleCreate = "GUILD_ROLE_CREATE",
	GuildRoleUpdate = "GUILD_ROLE_UPDATE",
	GuildRoleDelete = "GUILD_ROLE_DELETE",
	InviteCreate = "INVITE_CREATE",
	InviteDelete = "INVITE_DELETE",
	MessageCreate = "MESSAGE_CREATE",
	MessageUpdate = "MESSAGE_UPDATE",
	MessageDelete = "MESSAGE_DELETE",
	MessageDeleteBulk = "MESSAGE_DELETE_BULK",
	MessageReactionAdd = "MESSAGE_REACTION_ADD",
	MessageReactionRemove = "MESSAGE_REACTION_REMOVE",
	MessageReactionRemoveAll = "MESSAGE_REACTION_REMOVE_ALL",
	MessageReactionRemoveEmoji = "MESSAGE_REACTION_REMOVE_EMOJI",
	PresenceUpdate = "PRESENCE_UPDATE",
	TypingStart = "TYPING_START",
	UserUpdate = "USER_UPDATE",
	VoiceStateUpdate = "VOICE_STATE_UPDATE",
	VoiceServerUpdate = "VOICE_SERVER_UPDATE",
	WebhooksUpdate = "WEBHOOKS_UPDATE"
}

export declare type WSPayload = HelloPayload | Heartbeat | HeartbeatAck | InvalidSession | Reconnect | DispatchPayload;
export declare type SendPayload = WSHeartbeat | Identify | PresenceUpdate | VoiceStateUpdate | Resume | RequestGuildMembers;

interface BasePayload {
	op: OpCodes;
	s: number;
	d?: unknown;
	t?: string;
}

export interface HelloPayload extends BasePayload {
	op: OpCodes.HELLO;
	t: never;
	d: {
		heartbeat_interval: number;
	};
}

export type ReactionData<E extends WebSocketEvents, O extends string = never> = DataPayload<E, Omit<{
	user_id: Snowflake;
	channel_id: Snowflake;
	message_id: Snowflake;
	guild_id?: Snowflake;
	member?: APIGuildMemberData;
	emoji: APIEmojiPartial;
}, O>>;



export interface Heartbeat extends BasePayload {
	op: OpCodes.HEARTBEAT;
	t: never;
	d: never;
}

export interface HeartbeatAck extends BasePayload {
	op: OpCodes.HEARTBEAT_ACK;
	t: never;
	d: never;
}

export interface InvalidSession extends BasePayload {
	op: OpCodes.INVALID_SESSION;
	t: never;
	d: boolean;
}

interface DataPayload<Event extends WebSocketEvents, D = unknown> extends BasePayload {
	op: OpCodes.DISPATCH;
	t: Event;
	d: D;
	shard_id: number;
}

/** https://discord.com/developers/docs/topics/gateway#ready */
export declare type ReadyDispatch = DataPayload<WebSocketEvents.Ready, {
	v: number;
	// deno-lint-ignore ban-types
	user_settings: {};
	user: APIUserData;
	session_id: Snowflake;
	relationships: [];
	private_channels: [];
	presences: [];
	guilds: APIGuildUnavailableData[];
	shard?: [number, number];
}>;

/** https://discord.com/developers/docs/topics/gateway#resumed */
export declare type ResumedDispatch = DataPayload<WebSocketEvents.Resumed, never>;

/**
	* https://discord.com/developers/docs/topics/gateway#channel-create
	* https://discord.com/developers/docs/topics/gateway#channel-update
	* https://discord.com/developers/docs/topics/gateway#channel-delete */
export declare type ChannelCreateDispatch = DataPayload<WebSocketEvents.ChannelCreate | WebSocketEvents.ChannelUpdate | WebSocketEvents.ChannelDelete, APIChannelData>;

/** https://discord.com/developers/docs/topics/gateway#channel-pins-update */
export declare type ChannelPinsUpdateDispatch = DataPayload<WebSocketEvents.ChannelPinsUpdate, {
	guild_id?: Snowflake;
	channel_id: Snowflake;
	last_pin_timestamp?: string;
}>;

/**
	* https://discord.com/developers/docs/topics/gateway#guild-create
	* https://discord.com/developers/docs/topics/gateway#guild-update */
export declare type GuildCreateDispatch = DataPayload<WebSocketEvents.GuildCreate | WebSocketEvents.GuildUpdate, APIGuildData>;

/** https://discord.com/developers/docs/topics/gateway#guild-delete */
export declare type GuildDeleteDispatch = DataPayload<WebSocketEvents.GuildDelete, APIGuildUnavailableData>;

/**
	* https://discord.com/developers/docs/topics/gateway#guild-ban-add
	* https://discord.com/developers/docs/topics/gateway#guild-ban-remove */
export declare type GuildBanAddDispatch = DataPayload<WebSocketEvents.GuildBanAdd | WebSocketEvents.GuildBanRemove, {
	guild_id: Snowflake;
	user: APIUserData;
}>;

/** https://discord.com/developers/docs/topics/gateway#guild-emojis-update */
export declare type GuildEmojisUpdateDispatch = DataPayload<WebSocketEvents.GuildEmojisUpdate, {
	guild_id: Snowflake;
	emojis: APIEmojiData[];
}>;

/** https://discord.com/developers/docs/topics/gateway#guild-integrations-update */
export declare type GuildIntegrationsUpdateDispatch = DataPayload<WebSocketEvents.GuildIntegrationsUpdate, {
	guild_id: Snowflake;
}>;

/** https://discord.com/developers/docs/topics/gateway#guild-member-add */
export declare type GuildMemberAddDispatch = DataPayload<WebSocketEvents.GuildMemberAdd, APIGuildMemberData & {
	guild_id: Snowflake;
}>;

/** https://discord.com/developers/docs/topics/gateway#guild-member-remove */
export declare type GuildMemberRemoveDispatch = DataPayload<WebSocketEvents.GuildMemberRemove, {
	guild_id: Snowflake;
	user: APIUserData;
}>;

/** https://discord.com/developers/docs/topics/gateway#guild-member-update */
export declare type GuildMemberUpdateDispatch = DataPayload<WebSocketEvents.GuildMemberUpdate, {
	guild_id: Snowflake;
	roles: Snowflake[];
	user: APIUserData;
	nick?: string | null;
	premium_since?: string | null;
}>;

/** https://discord.com/developers/docs/topics/gateway#guild-members-chunk */
export declare type GuildMembersChunkDispatch = DataPayload<WebSocketEvents.GuildMembersChunk, {
	guild_id: Snowflake;
	members: APIGuildMemberData[];
	chunk_index?: number;
	chunk_count?: number;
	not_found?: unknown[];
	presences?: APIPresenceUpdateData[];
	nonce?: string;
}>;

/**
	* https://discord.com/developers/docs/topics/gateway#guild-role-create
	* https://discord.com/developers/docs/topics/gateway#guild-role-update */
export declare type GuildRoleCreateDispatch = DataPayload<WebSocketEvents.GuildRoleCreate | WebSocketEvents.GuildRoleUpdate, {
	guild_id: Snowflake;
	role_id: APIRoleData;
}>;

/** https://discord.com/developers/docs/topics/gateway#guild-role-delete */
export declare type GuildRoleDeleteDispatch = DataPayload<WebSocketEvents.GuildRoleDelete, {
	guild_id: Snowflake;
	role_id: Snowflake;
}>;

/** https://discord.com/developers/docs/topics/gateway#invite-create */
export declare type InviteCreateDispatch = DataPayload<WebSocketEvents.InviteCreate, {
	channel_id: Snowflake;
	code: string;
	created_at: string;
	guild_id?: Snowflake;
	inviter?: APIUserData;
	max_age: number;
	max_uses: number;
	target_user?: APIUserData;
	target_user_type?: APIInviteTargetType;
	temporary: boolean;
	uses: 0;
}>;

/** https://discord.com/developers/docs/topics/gateway#invite-delete */
export declare type InviteDeleteDispatch = DataPayload<WebSocketEvents.InviteDelete, {
	channel_id: Snowflake;
	guild_id?: Snowflake;
	code: string;
}>;

/** https://discord.com/developers/docs/topics/gateway#message-create */
export declare type MessageCreateDispatch = DataPayload<WebSocketEvents.MessageCreate, APIMessageData>;

/** https://discord.com/developers/docs/topics/gateway#message-update */
export declare type MessageUpdateDispatch = DataPayload<WebSocketEvents.MessageUpdate, {
	id: Snowflake;
	channel_id: Snowflake;
} & Partial<APIMessageData>>;

/** https://discord.com/developers/docs/topics/gateway#message-delete */
export declare type MessageDeleteDispatch = DataPayload<WebSocketEvents.MessageDelete, {
	id: Snowflake;
	channel_id: Snowflake;
	guild_id?: Snowflake;
}>;

/** https://discord.com/developers/docs/topics/gateway#message-delete-bulk */
export declare type MessageDeleteBulkDispatch = DataPayload<WebSocketEvents.MessageDeleteBulk, {
	ids: Snowflake[];
	channel_id: Snowflake;
	guild_id?: Snowflake;
}>;

/** https://discord.com/developers/docs/topics/gateway#message-reaction-add */
export declare type MessageReactionAddDispatch = ReactionData<WebSocketEvents.MessageReactionAdd>;

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove */
export declare type MessageReactionRemoveDispatch = ReactionData<WebSocketEvents.MessageReactionRemove, "member">;

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-all */
export declare type MessageReactionRemoveAllDispatch = DataPayload<WebSocketEvents.MessageReactionRemoveAll, MessageReactionRemoveData>;

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-emoji */
export declare type MessageReactionRemoveEmojiDispatch = DataPayload<WebSocketEvents.MessageReactionRemoveEmoji, MessageReactionRemoveData & {
	emoji: APIEmojiPartial;
}>;

/** https://discord.com/developers/docs/topics/gateway#presence-update */
export declare type PresenceUpdateDispatch = DataPayload<WebSocketEvents.PresenceUpdate, APIPresenceUpdateData>;

/** https://discord.com/developers/docs/topics/gateway#typing-start */
export declare type TypingStartDispatch = DataPayload<WebSocketEvents.TypingStart, {
	channel_id: Snowflake;
	guild_id?: Snowflake;
	user_id: Snowflake;
	timestamp: number;
	member?: APIGuildMemberData;
}>;

/** https://discord.com/developers/docs/topics/gateway#user-update */
export declare type UserUpdateDispatch = DataPayload<WebSocketEvents.UserUpdate, APIUserData>;

/** https://discord.com/developers/docs/topics/gateway#voice-state-update */
export declare type VoiceStateUpdateDispatch = DataPayload<WebSocketEvents.VoiceStateUpdate, APIVoiceState>;

/** https://discord.com/developers/docs/topics/gateway#voice-server-update */
export declare type VoiceServerUpdateDispatch = DataPayload<WebSocketEvents.VoiceServerUpdate, {
	token: string;
	guild_id: Snowflake;
	endpoint: string;
}>;

/** https://discord.com/developers/docs/topics/gateway#webhooks-update */
export declare type WebhooksUpdateDispatch = DataPayload<WebSocketEvents.WebhooksUpdate, {
	guild_id: Snowflake;
	channel_id: Snowflake;
}>;

export declare type DispatchPayload = ReadyDispatch | ResumedDispatch | ChannelCreateDispatch | ChannelPinsUpdateDispatch | GuildCreateDispatch | GuildDeleteDispatch | GuildBanAddDispatch | GuildEmojisUpdateDispatch | GuildIntegrationsUpdateDispatch | GuildMemberAddDispatch | GuildMemberRemoveDispatch | GuildMemberUpdateDispatch | GuildMembersChunkDispatch | GuildRoleCreateDispatch | GuildRoleDeleteDispatch | InviteCreateDispatch | InviteDeleteDispatch | MessageCreateDispatch | MessageUpdateDispatch | MessageDeleteDispatch | MessageDeleteBulkDispatch | MessageReactionAddDispatch | MessageReactionRemoveDispatch | MessageReactionRemoveAllDispatch | MessageReactionRemoveEmojiDispatch | PresenceUpdateDispatch | TypingStartDispatch | UserUpdateDispatch | VoiceStateUpdateDispatch | VoiceServerUpdateDispatch | WebhooksUpdateDispatch;

export interface WSHeartbeat {
	op: OpCodes.HEARTBEAT;
	d: number;
}

export interface Identify {
	op: OpCodes.IDENTIFY;
	d: {
		token: string;
		properties: {
			$os: string;
			$browser: string;
			device: string;
		};
		large_threshold?: number;
		shard?: [number, number];
		presence?: APIPresenceUpdateData;
		intents?: number;
	};
}

export interface Resume {
	op: OpCodes.RESUME;
	d: {
		token: string;
		session_id: Snowflake;
		seq: number;
	};
}

export interface RequestGuildMembers {
	op: OpCodes.REQUEST_GUILD_MEMBERS;
	d: {
		guild_id: Snowflake | Snowflake[];
		query?: string;
		limit: number;
		presences?: boolean;
		user_ids?: Snowflake | Snowflake[];
		nonce?: string;
	};
}

export interface VoiceStateUpdate {
	op: OpCodes.VOICE_STATE_UPDATE;
	d: {
		guild_id: Snowflake;
		channel_id: Snowflake | null;
		self_mute: boolean;
		self_deaf: boolean;
	};
}

export interface PresenceUpdate {
	op: OpCodes.STATUS_UPDATE;
	d: APIPresenceUpdateData;
}

export interface MessageReactionRemoveData {
	channel_id: Snowflake;
	message_id: Snowflake;
	guild_id?: Snowflake;
}

export interface PresenceUpdateData {
	since: number | null;
	game: APIActivityData | null;
	status: "online" | "dnd" | "idle" | "invisible" | "offline";
	afk: boolean;
}

export interface WSIdentify {
	properties: {
		$os: string;
		$browser: string;
		device: string;
	};
	large_threshold?: number;
	shard?: [number, number];
	presence?: PresenceUpdateData;
	intents?: number;
}

export interface SessionDetails {
	session_id: Snowflake;
	seq: number;
}

export declare type WorkerMasterMessages = {
	type: InternalActions.Debug;
	data: string;
} | {
	type: InternalActions.Dispatch;
	data: DispatchPayload;
} | {
	type: InternalActions.Identify | InternalActions.ScheduleIdentify;
} | {
	type: InternalActions.UpdatePing;
	data: number;
} | {
	type: InternalActions.GatewayStatus;
	data: GatewayStatus;
} | {
	type: InternalActions.CannotReconnect;
	data: {
		code: number;
		reason: string;
	};
} | {
	type: InternalActions.ConnectionStatusUpdate;
	data: WebSocketShardStatus;
} | {
	type: InternalActions.PayloadDispatch;
	data: SendPayload;
} | {
	type: InternalActions.FetchSessionData;
	data: SessionDetails;
};

export declare type MasterWorkerMessages = {
	type: InternalActions.Identify | InternalActions.Destroy | InternalActions.Reconnect | InternalActions.FetchSessionData;
} | {
	type: InternalActions.PayloadDispatch;
	data: SendPayload;
};

export interface WSWorkerData {
	gatewayURL: string;
	gatewayVersion: number;
	token: string;
	options: Required<WSOptions> & {
		shard: [number, number];
	};
}

export declare const enum GatewayStatus {
	Ready = 0,
	InvalidSession = 1
}

export {};
