// deno-lint-ignore-file no-explicit-any
import {
  APIActivityButtons,
  APIActivityDataAssets,
  APIActivityDataEmoji,
  APIActivityDataParty,
  APIActivityDataSecrets,
  APIActivityDataTimestamp,
} from "./sub-lib/Activity.ts";
import { APIApplicationCommandOptionData } from "./sub-lib/ApplicationCommands.ts";
import { APIAuditLogEntryData } from "./sub-lib/AuditLog.ts";
import {
  APIAutoModerationRuleActionData,
  APIAutoModerationRuleMetadataData,
} from "./sub-lib/AutoModeration.ts";

export type Snowflake = bigint | string;

/** https://discord.com/developers/docs/topics/gateway-events#activity-object */
export interface APIActivityData {
  name: string;
  type: ActivityType;
  url?: string | null;
  created_at: number;
  timestamps?: APIActivityDataTimestamp;
  application_id?: Snowflake;
  details?: string | null;
  state?: string | null;
  emoji?: APIActivityDataEmoji | null;
  party?: APIActivityDataParty;
  assets?: APIActivityDataAssets;
  secrets?: APIActivityDataSecrets;
  instance?: boolean;
  flags?: ActivityFlags;
  buttons?: APIActivityButtons[];
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-object */
export interface APIAuditLogData {
  application_commands: APIApplicationCommandData[];
  audit_log_entries: APIAuditLogEntryData[];
  auto_moderation_rules: APIAutoModerationRuleData[];
  webhooks: APIWebhookData[];
  users: APIUserData[];

  integrations: Partial<APIIntegrationData>[];
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure */
export interface APIApplicationCommandData {
  id: Snowflake;
  type?: APIApplicationCommandDataType;
  application_id: Snowflake;
  guild_id?: Snowflake;
  name: string;
  name_localization: LocalesType | null;
  description: string;
  description_localizations?: LocalesType | null;
  options?: APIApplicationCommandOptionData[];
  default_member_permissions: string | null;
  dm_permission?: boolean;
  default_permission?: boolean | null;
  nsfw?: boolean;
  version: Snowflake;
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object */
export interface APIAutoModerationRuleData {
  id: Snowflake;
  guild_id: Snowflake;
  name: string;
  creator_id: Snowflake;
  /** Use the enum: {@link APIAutoModerationRuleEvent} */
  event_type: number;
  /** Use the enum: {@link APIAutoModerationRuleTrigger} */
  trigger_type: number;
  trigger_metadata: APIAutoModerationRuleMetadataData;
  actions: APIAutoModerationRuleActionData[];
  enabled: boolean;
  exempt_roles: Snowflake[];
  exempt_channels: Snowflake[];
}

/** https://discord.com/developers/docs/resources/guild#ban-object-ban-structure */
export interface APIBanData {
  reason: string | null;
  user: APIUserData;
}

/** Not Documented, but partial only includes id, name, and type. */
export interface APIChannelPartial {
  id: string;
  type: APIChannelType;
  name?: string;
}

/** https://discord.com/developers/docs/resources/channel#channel-object */
export interface APIChannelData extends APIChannelData {
  guild_id?: string;
  position?: number;
  permission_overwrites?: APIOverwriteData[];
  topic?: string | null;
  nsfw?: boolean;
  last_message_id?: string | null;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: APIUserData[];
  icon?: string | null;
  owner_id?: string;
  application_id?: string;
  parent_id?: string | null;
  last_pin_timestamp?: string;
}

/** https://discord.com/developers/docs/resources/user#connection-object-connection-structure */
export interface APIConnectionData {
  id: string;
  name: string;
  type: string;
  revoked?: boolean;
  integrations?: APIIntegrationData[];
  verified: boolean;
  friend_sync: boolean;
  show_activity: boolean;
  visibility: ConnectionVisibility;
}

/** https://discord.com/developers/docs/resources/channel#embed-object */
export interface APIEmbedData {
  title?: string;
  type?: EmbedType;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: APIEmbedFooterData;
  image?: APIEmbedImageData;
  thumbnail?: APIEmbedThumbnailData;
  video?: APIEmbedVideoData;
  provider?: APIEmbedProviderData;
  author?: APIEmbedAuthorData;
  fields?: APIEmbedFieldData[];
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure */
export interface APIEmbedFooterData {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure */
export interface APIEmbedImageData {
  url?: string;
  proxy_url?: string;
  height?: number;
  weight?: number;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure */
export interface APIEmbedThumbnailData {
  url?: string;
  proxy_url?: string;
  height?: number;
  weight?: number;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure */
export interface APIEmbedVideoData {
  url?: string;
  height?: string;
  weight?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure */
export interface APIEmbedProviderData {
  name?: string;
  url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure */
export interface APIEmbedAuthorData {
  name?: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure */
export interface APIEmbedFieldData {
  name: string;
  value: string;
  inline?: boolean;
}

/** Not Documented, but partial doesn't include roles, users, require_colons, or managed. */
export interface APIEmojiPartial {
  id: string | null;
  name: string | null;
  animated?: boolean;
}

/** https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure */
export interface APIEmojiData extends APIEmojiPartial {
  roles?: string[];
  user?: APIUserData;
  require_colons?: boolean;
  managed?: boolean;
  available?: boolean;
}

export interface APIGuildUnavailable {
  id: string;
  unavailable: boolean;
}

/** Not Documented, but partial only includes id, name, icon, and splash. */
export interface APIGuildPartial {
  id: string;
  name: string;
  icon: string | null;
  splash: string | null;
  unavailable?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#guild-object-guild-structure */
export interface APIGuildData extends APIGuildPartial {
  discovery_splash: string | null;
  owner?: boolean;
  owner_id: string;
  permissions?: number;
  region: string;
  // https://www.npmjs.com/package/@klasa/dapi-types?activeTab=code
  // LINE: 266
}

export type LocalesType =
  | "id"
  | "da"
  | "de"
  | "en-GB"
  | "en-US"
  | "es-ES"
  | "fr"
  | "hr"
  | "it"
  | "lt"
  | "hu"
  | "nl"
  | "no"
  | "pl"
  | "pt-BR"
  | "ro"
  | "fi"
  | "sv-SE"
  | "vi"
  | "tr"
  | "cs"
  | "el"
  | "bg"
  | "ru"
  | "uk"
  | "hi"
  | "th"
  | "zh-CN"
  | "ja"
  | "zh-TW"
  | "ko";

/** https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types */
export declare const enum ActivityType {
  /**
   * Playing {name}
   * - "Playing Rocket League" */
  Game = 0,
  /**
   * Streaming {details}
   * - "Streaming Rocket League" */
  Streaming = 1,
  /**
   * Listening to {name}
   * - "Listening to Spotify" */
  Listening = 2,
  /**
   * Watching {name}
   * - "Watching YouTube Together" */
  Watching = 3,
  /** {emoji} {state}
   * - ":smiley: I am cool" */
  Custom = 4,
  /**
   * Competing in {name}
   * - "Competing in Arena World Champions" */
  Competing = 5,
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-flags */
export declare const enum ActivityFlags {
  INSTANCE = 1 << 0,
  JOIN = 1 << 1,
  SPECTATE = 1 << 2,
  JOIN_REQUEST = 1 << 3,
  SYNC = 1 << 4,
  PLAY = 1 << 5,
  PARTY_PRIVACY_FRIENDS = 1 << 6,
  PARTY_PRIVACY_VOICE_CHANNEL = 1 << 7,
  EMBEDDED = 1 << 8,
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types */
export declare const enum APIApplicationCommandDataType {
  CHAT_INPUT = 1,
  USER = 2,
  MESSAGE = 3,
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type */
export declare const enum APIApplicationCommandDataOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  /** Any integer between -2^53 and 2^53 */
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  /** Includes all channel types + categories */
  CHANNEL = 7,
  ROLE = 8,
  /** Includes users and roles */
  MENTIONABLE = 9,
  NUMBER = 10,
  ATTACHMENT = 11,
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events */
export declare const enum APIAuditLogEvent {
  GUILD_UPDATE = 1,
  CHANNEL_CREATE = 10,
  CHANNEL_UPDATE = 11,
  CHANNEL_DELETE = 12,
  CHANNEL_OVERWRITE_CREATE = 13,
  CHANNEL_OVERWRITE_UPDATE = 14,
  CHANNEL_OVERWRITE_DELETE = 15,
  MEMBER_KICK = 20,
  MEMBER_PRUNE = 21,
  MEMBER_BAN_ADD = 22,
  MEMBER_BAN_REMOVE = 23,
  MEMBER_UPDATE = 24,
  MEMBER_ROLE_UPDATE = 25,
  MEMBER_MOVE = 26,
  MEMBER_DISCONNECT = 27,
  BOT_ADD = 28,
  ROLE_CREATE = 30,
  ROLE_UPDATE = 31,
  ROLE_DELETE = 32,
  INVITE_CREATE = 40,
  INVITE_UPDATE = 41,
  INVITE_DELETE = 42,
  WEBHOOK_CREATE = 50,
  WEBHOOK_UPDATE = 51,
  WEBHOOK_DELETE = 52,
  EMOJI_CREATE = 60,
  EMOJI_UPDATE = 61,
  EMOJI_DELETE = 62,
  MESSAGE_DELETE = 72,
  MESSAGE_BULK_DELETE = 73,
  MESSAGE_PIN = 74,
  MESSAGE_UNPIN = 75,
  INTEGRATION_CREATE = 80,
  INTEGRATION_UPDATE = 81,
  INTEGRATION_DELETE = 82,
  STAGE_INSTANCE_CREATE = 83,
  STAGE_INSTANCE_UPDATE = 84,
  STAGE_INSTANCE_DELETE = 85,
  STICKER_CREATE = 90,
  STICKER_UPDATE = 91,
  STICKER_DELETE = 92,
  GUILD_SCHEDULED_EVENT_CREATE = 100,
  GUILD_SCHEDULED_EVENT_UPDATE = 101,
  GUILD_SCHEDULED_EVENT_DELETE = 102,
  THREAD_CREATE = 110,
  THREAD_UPDATE = 111,
  THREAD_DELETE = 112,
  APPLICATION_COMMAND_PERMISSION_UPDATE = 121,
  AUTO_MODERATION_RULE_CREATE = 140,
  AUTO_MODERATION_RULE_UPDATE = 141,
  AUTO_MODERATION_RULE_DELETE = 142,
  AUTO_MODERATION_BLOCK_MESSAGE = 143,
  AUTO_MODERATION_FLAG_TO_CHANNEL = 144,
  AUTO_MODERATION_USER_COMMUNICATION_DISABLED = 145,
  CREATOR_MONETIZATION_REQUEST_CREATED = 150,
  CREATOR_MONETIZATION_TERMS_ACCEPTED = 151,
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types */
export declare const enum APIAutoModerationRuleEvent {
  MESSAGE_SEND = 1,
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types */
export declare const enum APIAutoModerationRuleTrigger {
  KEYWORD = 1,
  SPAM = 3,
  KEYWORD_PRESET = 4,
  MENTION_SPAM = 5,
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-keyword-preset-types */
export declare const enum APIAutoModerationRuleKeywordPreset {
  PROFANITY = 1,
  SEXUAL_CONTENT = 2,
  SLURS = 3,
}

export declare const enum APIAutoModerationRuleActionType {
  BLOCK_MESSAGE = 1,
  SEND_ALERT_MESSAGE = 2,
  TIMEOUT = 3,
}

/** https://discord.com/developers/docs/resources/channel#channel-object-channel-types */
export declare const enum APIChannelType {
  GUILD_TEXT = 0,
  DM = 1,
  GUILD_VOICE = 2,
  GROUP_DM = 3,
  GUILD_CATEGORY = 4,
  GUILD_ANNOUNCEMENT = 5,
  ANNOUNCEMENT_THREAD = 10,
  PUBLIC_THREAD = 11,
  PRIVATE_THREAD = 12,
  GUILD_STAGE_VOICE = 13,
  GUILD_DIRECTORY = 14,
  GUILD_FORUM = 15,
  GUILD_MEDIA = 16,
}

// https://discord.com/developers/docs/reference#locales
export const LocalesName: {
  [key in LocalesType]: string;
} = {
  "bg": "Bulgarian",
  "cs": "Czech",
  "da": "Danish",
  "de": "German",
  "el": "Greek",
  "en-GB": "English, UK",
  "en-US": "English, US",
  "es-ES": "Spanish",
  "fi": "Finnish",
  "fr": "French",
  "hi": "Hindi",
  "hr": "Croation",
  "hu": "Hungarian",
  "id": "Indonesian",
  "it": "Italian",
  "ja": "Japanese",
  "ko": "Korean",
  "lt": "Lithuanian",
  "nl": "Dutch",
  "no": "Norwegian",
  "pl": "Polish",
  "pt-BR": "Portuguese, Brazilian",
  "ro": "Romanian, Romania",
  "ru": "Russian",
  "sv-SE": "Swedish",
  "th": "Thai",
  "tr": "Turkish",
  "uk": "Ukrainian",
  "vi": "Vietnamese",
  "zh-CN": "Chinese, China",
  "zh-TW": "Chinese, Taiwan",
};
