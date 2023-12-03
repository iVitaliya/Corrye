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
  APIVoiceStateData,
} from "../../../dapi-types/lib/DiscordAPITypes.ts";
import type { WSOptions } from "../lib/WebSocketShard.ts";
import type { WebSocketShardStatus } from "../lib/WebSocketShard.ts";

export declare const enum WebSocketManagerEvents {
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
};

