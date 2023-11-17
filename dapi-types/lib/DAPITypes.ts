import * as AppCmds from "./sub-types/applicationCommands.ts";

type Snowflake = bigint | string;
type Lang = { "language_name": string; "native_name": string };

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

/** https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-timestamps */
export interface APIActivityDataTimestamp {
  start?: number;
  end?: number;
}

/** https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-emoji */
export interface APIActivityDataEmoji {
  name: string;
  id?: Snowflake;
  animated?: boolean;
}

/** https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-party */
export interface APIActivityDataParty {
  id?: string;
  size?: [number, number];
}

/** https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-assets */
export interface APIActivityDataAssets {
  large_image?: string;
  large_text?: string;
  small_image?: string;
  small_text?: string;
}

/** https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-secrets */
export interface APIActivityDataSecrets {
  join?: string;
  spectate?: string;
  match?: string;
}

/** https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-buttons */
export interface APIActivityButtons {
  label: string;
  url: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-object */
export interface APIAuditLogData {
  application_commands: APIApplicationCommand[];
  audit_log_entries: APIAuditLogEntryData[];
  auto_moderation_rules: APIAutoModerationRule[];
  webhooks: APIWebhookData[];
  users: APIUserData[];

  integrations: Partial<APIIntegrationData>[];
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure */
export interface APIApplicationCommand {
  id: Snowflake;
  type?: APIApplicationCommandType;
  application_id: Snowflake;
  guild_id?: Snowflake;
  name: string;
  name_localization: LocalesType | null;
  description: string;
  description_localizations?: LocalesType | null;
  options?: APIApplicationCommandOption[];
  default_member_permissions: string | null;
  dm_permission?: boolean;
  default_permission?: boolean | null;
  nsfw?: boolean;
  version: Snowflake;
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure */
export interface APIApplicationCommandOption {
  type: APIApplicationCommandOptionType;
  name: string;
  name_localizations?: LocalesType | null;
  description: string;
  description_localizations?: LocalesType | null;
  required?: boolean;
  choices?: APIApplicationCommandChoice[];
  options?: APIApplicationCommandOption[];
  // channel_type: https://discord.com/developers/docs/resources/channel#channel-object-channel-types
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object */
export interface APIAuditLogEntryData {
  target_id: string | null;
  changes?: APIAuditLogChangeData[];
  user_id: string;
  id: string;
  action_type: AuditLogEvent;
  options?: APIAuditLogOptionsData;
  reason?: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure */
export interface APIAuditLogChangeData {
  new_value?: unknown;
  old_value?: unknown;
  key: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info */
export interface APIAuditLogOptionsData {
  delete_member_days?: string;
  members_removed?: string;
  channel_id?: string;
  message_id?: string;
  count?: string;
  id?: string;
  type?: "member" | "role";
  role_name?: string;
}

/** https://discord.com/developers/docs/resources/guild#ban-object-ban-structure */
export interface APIBanData {
  reason: string | null;
  user: APIUserData;
}

/** Not Documented, but partial only includes id, name, and type. */
export interface APIChannelPartial {
  id: string;
  type: ChannelType;
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

type LocalesType =
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
export declare const enum APIApplicationCommandType {
  CHAT_INPUT = 1,
  USER = 2,
  MESSAGE = 3,
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type */
export declare const enum APIApplicationCommandOptionType {
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

// https://discord.com/developers/docs/reference#locales
export const Locales = {
  "id": {
    "language_name": "Indonesian",
    "native_name": "Bahasa Indonesia",
  },
  "da": {
    "language_name": "Danish",
    "native_name": "Dansk",
  },
  "de": {
    "language_name": "German",
    "native_name": "Deutsch",
  },
  "en-GB": {
    "language_name": "English, UK",
    "native_name": "English, UK",
  },
  "en-US": {
    "language_name": "English, US",
    "native_name": "English, US",
  },
  "es-ES": {
    "language_name": "Spanish",
    "native_name": "Español",
  },
  "fr": {
    "language_name": "French",
    "native_name": "Français",
  } as Lang,
};
