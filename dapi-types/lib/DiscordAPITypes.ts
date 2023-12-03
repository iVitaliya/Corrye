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
import {
  APIEmbedAuthorData,
  APIEmbedFieldData,
  APIEmbedFooterData,
  APIEmbedImageData,
  APIEmbedProviderData,
  APIEmbedThumbnailData,
  APIEmbedVideoData,
} from "./sub-lib/Embed.ts";
import { APIGuildScheduledEventEntityMetadataData } from "./sub-lib/GuildScheduledEvents.ts";
import {
  APIMessageActivityData,
  APIMessageReferenceData,
} from "./sub-lib/Message.ts";
import { APIReactionCountDetailsData } from "./sub-lib/Reaction.ts";
import { APIRoleTags } from "./sub-lib/Role.ts";
import { APIWelcomeScreenChannelData } from "./sub-lib/WelcomeChannel.ts";

export type Snowflake = bigint | string;
export type Integer = number | bigint;
type Timestamp = string | number | bigint | RegExp | typeof RegExp;

type EnumKey<T> = keyof T;
type EnumValue<T> = APIInteractionType[];

/** https://discord.com/developers/docs/resources/user#user-object-user-structure */
export interface APIUserData {
  id: Snowflake;
  username: string;
  discriminator: string;
  global_name: string | null;
  avatar: string | null;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string | null;
  accent_color?: number | null;
  locale?: string;
  verified?: boolean;
  email?: string | null;
  flags?: Integer;
  /** Uses the enum: {@link APIUserPremiumTypes} */
  premium_type?: number;
  public_flags?: Integer;
  avatar_decoration?: string | null;
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object */
export interface APIGuildMemberData {
  user?: APIUserData;
  nick?: string | null;
  avatar?: string | null;
  roles: Snowflake[];
  joined_at: Timestamp;
  premium_since?: Timestamp | null;
  deaf: boolean;
  mute: boolean;
  /** Uses the enum: {@link APIGuildMemberFlags} */
  flags: number;
  pending?: boolean;
  permissions?: string;
  communication_disabled_until?: Timestamp | null;
}

/** https://discord.com/developers/docs/resources/channel#thread-member-object */
export interface APIThreadMember {
  /** These fields are omitted on the member sent within each thread in the {@link https://discord.com/developers/docs/topics/gateway-events#guild-create GUILD_CREATE} event. */
  id?: Snowflake;
  /** These fields are omitted on the member sent within each thread in the {@link https://discord.com/developers/docs/topics/gateway-events#guild-create GUILD_CREATE} event. */
  user_id?: Snowflake;
  join_timestamp: Timestamp;
  flags: number;
  /**
   * These fields are omitted on the member sent within each thread in the {@link https://discord.com/developers/docs/topics/gateway-events#guild-create GUILD_CREATE} event.
   *
   * The `member` field is only present when `with_member` is set to `true` when calling {@link https://discord.com/developers/docs/resources/channel#list-thread-members List Thread Members} or {@link https://discord.com/developers/docs/resources/channel#get-thread-member Get Thread Member}. */
  member?: APIGuildMemberData;
}

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

/**
 * https://discord.com/developers/docs/topics/gateway#presence-update
 *
 * The user object within this event can be partial, the only field which must be sent is the **id** field, everything else is optional.
 *
 * Along with this limitation, no fields are required, and the types of the fields are not validated.
 */
export interface APIPresenceUpdateData {
  user: {
    id: string;
  } & Partial<APIUserData>;
  roles?: string[];
  game?: APIActivityData | null;
  guild_id?: string;
  status?: APIPresenceUpdateStatusData;
  activities?: APIActivityData[];
  client_status?: APIClientStatusData;
  premium_since?: string | null;
  nick?: string | null;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-object */
export interface APIAuditLogData {
  application_commands: APIApplicationCommandData[];
  audit_log_entries: APIAuditLogEntryData[];
  auto_moderation_rules: APIAutoModerationRuleData[];
  guild_scheldud_events: APIGuildScheduledEventData[];
  integrations: APIIntegrationData[];
  threads: APIChannelData[];
  users: APIUserData[];
  webhooks: APIWebhookData;
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

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object */
export interface APIGuildScheduledEventData {
  id: Snowflake;
  guild_id: Snowflake;
  channel_id: Snowflake | null;
  creator_id?: Snowflake | null;
  name: string;
  description?: string | null;
  scheduled_start_time: Timestamp;
  /** **required** if entity_type is `EXTERNAL` */
  scheduled_end_time: Timestamp | null;
  privacy_level: APIGuildScheduledEventPrivacyLevel;
  status: APIGuildScheduledEventStatus;
  entity_type: APIGuildScheduledEventEntityType;
  entity_id: Snowflake | null;
  entity_metadata: APIGuildScheduledEventEntityMetadataData | null;
  creator?: APIUserData;
  user_count?: number;
  image?: string | null;
}

/** https://discord.com/developers/docs/resources/guild#integration-object */
export interface APIIntegrationData {
  id: Snowflake;
  name: string;
  /** Example types can be: (twitch, youtube, discord, or guild_subscription) */
  type: string;
  enabled: boolean;
  /** **not provided for discord bot integrations** */
  syncing?: boolean;
  /** **not provided for discord bot integrations** */
  role_id?: Snowflake;
  /** **not provided for discord bot integrations** */
  enable_emoticons?: boolean;
  /** **not provided for discord bot integrations** */
  expire_behavior?: APIIntegrationExpireBehavior;
  /** **not provided for discord bot integrations** */
  expire_grace_period?: number;
  user?: APIUserData;
  account: APIAccountData;
  /** **not provided for discord bot integrations** */
  synced_at?: Timestamp;
  /** **not provided for discord bot integrations** */
  subscriber_count?: number;
  /** **not provided for discord bot integrations** */
  revoked?: boolean;
  /** **not provided for discord bot integrations** */
  application?: APIApplicationData;
  /** **not provided for discord bot integrations** */
  scopes?: APIOAuth2Scope[];
}

/** https://discord.com/developers/docs/resources/guild#integration-account-object */
export interface APIAccountData {
  id: string;
  name: string;
}

/** https://discord.com/developers/docs/resources/guild#integration-application-object */
export interface APIApplicationData {
  id: Snowflake;
  name: string;
  icon: string | null;
  description: string;
  bot?: APIUserData;
}

/** https://discord.com/developers/docs/resources/webhook#webhook-object */
export interface APIWebhookData {
  id: Snowflake;
  /** Uses the enum: {@link APIWebhookType} */
  type: number;
  guild_id?: Snowflake | null;
  channel_id: Snowflake | null;
  user?: APIUserData;
  name: string | null;
  avatar: string | null;
  token?: string;
  application_id: Snowflake | null;
  /** will be absent if the webhook creator has since lost access to the guild where the followed channel resides */
  source_guild?: APIGuildData;
  /** will be absent if the webhook creator has since lost access to the guild where the followed channel resides */
  source_channel?: APIChannelData;
  url?: string;
}

/** Not Documented, but partial only includes id, name, and type. */
export interface APIChannelPartial {
  id: Snowflake;
  type: APIChannelType;
  name?: string | null;
}

/** https://discord.com/developers/docs/resources/channel#channel-object */
export interface APIChannelData extends APIChannelPartial {
  guild_id?: Snowflake;
  position?: number;
  permission_overwrites?: APIOverwriteData[];
  topic?: string | null;
  nsfw?: boolean;
  last_message_id?: Snowflake | null;
  bitrate?: number;
  user_limit?: number;
  /** `rate_limit_per_user` also applies to thread creation. Users can send one message and create one thread during each `rate_limit_per_user` interval. */
  rate_limit_per_user?: number;
  recipients?: APIUserData[];
  icon?: string | null;
  owner_id?: Snowflake;
  application_id?: Snowflake;
  managed?: boolean;
  parent_id?: Snowflake | null;
  last_pin_timestamp?: Timestamp | null;
  rtc_region?: string | null;
  video_quality_mode?: number;
  /** For threads created before July 1, 2022, the message count is inaccurate when it's greater than 50. */
  message_count?: number;
  member_count?: number;
  thread_metadata?: APIThreadMetadataData;
  member?: APIThreadMember;
  default_auto_archive_duration?: number;
  permissions?: string;
  flags?: number;
  total_message_sent?: number;
  available_tags?: APITag[];
  applied_tags?: Snowflake[];
  default_reaction_emoji?: APIDefaultReaction;
  default_thread_rate_limit_per_user?: number;
  default_sort_order?: number | null;
  default_forum_layout?: number;
}

/** https://discord.com/developers/docs/resources/channel#channel-mention-object */
export interface APIChannelMentionData {
  id: Snowflake;
  guild_id: Snowflake;
  /** Uses the enum: {@link APIChannelType} */
  type: number;
  name: string;
}

/** https://discord.com/developers/docs/topics/permissions#role-object */
export interface APIRoleData {
  id: Snowflake;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string | null;
  unicode_emoji?: string | null;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
  tags?: APIRoleTags;
  /** Uses the enum: {@link APIRoleFlags} */
  flags: number;
}

export interface APIGuildUnavailableData {
  id: Snowflake;
  unavailable: boolean;
}

/** https://discord.com/developers/docs/resources/user#get-current-user-guilds */
export interface APIPartialGuildData {
  id: Snowflake;
  name: string;
  icon: string | null;
  /** only sent when using the {@link https://discord.com/developers/docs/resources/user#get-current-user-guilds GET Current User Guilds} endpoint and are relative to the requested user */
  owner?: boolean;
  /** only sent when using the {@link https://discord.com/developers/docs/resources/user#get-current-user-guilds GET Current User Guilds} endpoint and are relative to the requested user */
  permissions?: string;
  features: APIGuildFeatures[];
  approximate_member_count: number;
  approximate_presence_count: number;
  unavailable?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#guild-object-guild-structure */
export interface APIGuildData extends APIPartialGuildData {
  icon_hash?: string | null;
  splash: string | null;
  discovery_splash: string | null;
  /** only sent when using the {@link https://discord.com/developers/docs/resources/user#get-current-user-guilds GET Current User Guilds} endpoint and are relative to the requested user */
  owner_id: Snowflake;
  /**
   * is deprecated and is replaced by {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-structure channel.rtc_region}
   * @deprecated */
  region?: string | null;
  afk_channel_id: Snowflake | null;
  afk_timeout: number;
  widget_enabled?: boolean;
  widget_channel_id?: Snowflake | null;
  /** Uses the enum: {@link APIVerificationLevel} */
  verification_level: number;
  /** Uses the enum: {@link APIMessageNotifications} */
  default_message_notifications: number;
  /** Uses the enum: {@link APIExplicitContentFilter} */
  explicit_content_filter: number;
  roles: APIRoleData[];
  emojis: APIEmojiData[];
  /** Uses the enum: {@link APIMFALevel} */
  mfa_level: number;
  application_id: Snowflake | null;
  system_channel_id: Snowflake | null;
  /** Uses the enum: {@link APISystemChannelFlags} */
  system_channel_flags: number;
  rules_channel_id: Snowflake | null;
  max_presences?: number | null;
  max_members?: number;
  vanity_url_code: string | null;
  description: string | null;
  banner: string | null;
  premium_tier: number;
  premium_subscription_count?: number;
  preferred_locale: LocalesType;
  public_updates_channel_id: Snowflake | null;
  max_video_channel_users?: number;
  max_stage_video_channels_users?: number;
  welcome_screen?: APIWelcomeScreenData;
  /** Uses the enum: {@link APINSFWLevel} */
  nsfw_level: number;
  stickers?: APIStickerData;
  premium_progress_bar_enabled: boolean;
  safety_alerts_channel_id: Snowflake | null;
}

/** https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-channel-structure */
export interface APIWelcomeScreenData {
  description: string | null;
  welcome_channels: APIWelcomeScreenChannelData;
}

/** https://discord.com/developers/docs/resources/sticker#sticker-object */
export interface APIStickerData {
  id: Snowflake;
  pack_id?: Snowflake;
  name: string;
  description: string | null;
  /** A comma separated list of keywords is the format used in this field by standard stickers, but this is just a convention. Incidentally the client will always use a name generated from an emoji as the value of this field when creating or modifying a guild sticker. */
  tags: string;
  /** @deprecated */
  asset?: string;
  /** Uses the enum: {@link APIStickerType} */
  type: number;
  /** Uses the enum: {@link APIStcikerFormatType} */
  format_type: number;
  available?: boolean;
  guild_id?: Snowflake;
  user?: APIUserData;
  sort_value?: number;
}

/** https://discord.com/developers/docs/resources/voice#voice-state-object */
export interface APIVoiceState {
  guild_id?: Snowflake;
  channel_id: Snowflake | null;
  user_id: Snowflake;
  member?: APIGuildMemberData;
  session_id: string;
  deaf: boolean;
  mute: boolean;
  self_deaf: boolean;
  self_mute: boolean;
  self_stream?: boolean;
  self_video: boolean;
  suppress: boolean;
  request_to_speak_timestamp: Timestamp | null;
}

/** https://discord.com/developers/docs/resources/channel#default-reaction-object */
export interface APIDefaultReaction {
  emoji_id: Snowflake | null;
  emoji_name: string | null;
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

/** https://discord.com/developers/docs/resources/guild#ban-object-ban-structure */
export interface APIBanData {
  reason: string | null;
  user: APIUserData;
}

/** https://discord.com/developers/docs/resources/channel#embed-object */
export interface APIEmbedData {
  type?: EmbedType;
  title?: string;
  url?: string;
  description?: string;
  color?: number;
  thumbnail: APIEmbedThumbnailData;
  image?: APIEmbedImageData;
  video?: APIEmbedVideoData;
  provider?: APIEmbedProviderData;
  author?: APIEmbedAuthorData;
  fields?: APIEmbedFieldData[];
  footer?: APIEmbedFooterData;
  timestamp?: string;
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

/** https://discord.com/developers/docs/resources/guild#guild-widget-object */
export interface APIGuildWidgetData {
  id: Snowflake;
  /** this property may be from `2`-`100` characters */
  name: string;
  instant_invite: string | null;
  channels: APIChannelData[];
  members: APIUserData[];
  presence_count: number;
}

export interface APIGuildPreviewData
  extends Omit<APIGuildUnavailableData, "unavailable"> {
  name: string;
  icon: string | null;
  splash: string | null;
  discovery_splash: string | null;
  emojis: APIEmojiData[];
  features: APIGuildFeatures[];
  approximate_member_count: number;
  approximate_presence_count: number;
  description: string | null;
  stickers: APIStickerData[];
}

/**
 * The vanity URL data.
 * @see https://discord.com/developers/docs/resources/guild#get-guild-vanity-url-example-partial-invite-object */
export interface APIGuildVanityData {
  /**
   * The code of this invite.
   * @example "discord" */
  code: string;
  /**
   * The amount of uses the invite has.
   * @example 42 */
  uses: number;
}

/** https://discord.com/developers/docs/resources/invite#invite-object-invite-structure */
export interface APIInviteData {
  code: string;
  guild?: APIGuildData;
  channel: Partial<APIChannelData> | null;
  inviter?: APIUserData;
  /** Uses the enum: {@link APIInviteTargetType} */
  target_type?: number;
  target_user?: APIUserData;
  target_application?: APIApplicationData;
  approximate_presence_count?: number;
  expires_at?: Timestamp | null;
  /** @deprecated */
  stage_instance?: APIInviteStageData;
  guild_scheduled_event?: APIGuildScheduledEventData;
}

/**
 * https://discord.com/developers/docs/resources/invite#invite-stage-instance-object
 * @deprecated */
export interface APIInviteStageData {
  members: APIGuildMemberData[];
  participant_count: number;
  speaker_count: number;
  topic: string;
}

/** https://discord.com/developers/docs/resources/invite#invite-metadata-object-invite-metadata-structure */
export interface APIInviteMetadataData {
  uses: number;
  max_uses: number;
  max_age: number;
  temporary: boolean;
  created_at: Timestamp;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-structure */
export interface APIMessageData {
  id: Snowflake;
  channel_id: Snowflake;
  /**
   * The author object follows the structure of the user object, but is only a valid user in the case where the message is
   * generated by a user or bot user. If the message is generated by a webhook, the author object corresponds to the
   * webhook's id, username, and avatar. You can tell if a message is generated by a webhook by checking for the webhook_id
   * on the message object. */
  author: APIUserData;
  /**
   * An app will receive empty values in the `content`, `embeds`, `attachments`, and `components` fields if they have not
   * configured (or been approved for) the {@link https://discord.com/developers/docs/topics/gateway#message-content-intent MESSAGE_CONTENT privileged intent (1 << 15)}. */
  content: string;
  timestamp: Timestamp;
  edited_timestamp: Timestamp | null;
  tts: boolean;
  mention_everyone: boolean;
  mentions: APIUserData[];
  mention_roles: APIRoleData[];
  /**
   * Not all channel mentions in a message will appear in `mention_channels`. Only textual channels that are visible to
   * everyone in a lurkable guild will ever be included. Only crossposted messages (via Channel Following) currently include
   * `mention_channels` at all. If no mentions in the message meet these requirements, this field will not be sent. */
  mention_channels?: APIChannelMentionData[];
  /**
   * An app will receive empty values in the `content`, `embeds`, `attachments`, and `components` fields if they have not
   * configured (or been approved for) the {@link https://discord.com/developers/docs/topics/gateway#message-content-intent MESSAGE_CONTENT privileged intent (1 << 15)}. */
  attachments: APIAttachmentData[];
  /**
   * An app will receive empty values in the `content`, `embeds`, `attachments`, and `components` fields if they have not
   * configured (or been approved for) the {@link https://discord.com/developers/docs/topics/gateway#message-content-intent MESSAGE_CONTENT privileged intent (1 << 15)}. */
  embeds: APIEmbedData[];
  reactions?: APIReactionData[];
  nonce?: string | number;
  pinned: boolean;
  webhook_id?: Snowflake;
  type: APIMessageType;
  activity?: APIMessageActivityData;
  application?: APIApplicationData;
  application_id?: Snowflake;
  message_reference: APIMessageReferenceData;
  /** Uses the enum: {@link APIMessageFlags} */
  flags?: number;
  /**
   * This field is only returned for messages with a `type` of `19` (REPLY) or `21` (THREAD_STARTER_MESSAGE). If the
   * message is a reply but the `referenced_message` field is not present, the backend did not attempt to fetch the message that
   * was being replied to, so its state is unknown. If the field exists but is null, the referenced message was deleted. */
  refferenced_message?: APIMessageData | null;
  interaction?: APIMessageInteractionData;
  thread?: APIChannelData;
  components: APIMessageComponents[];
}

/** https://discord.com/developers/docs/resources/channel#attachment-object */
export interface APIAttachmentData {
  id: Snowflake;
  filename: string;
  description?: string;
  content_type?: string;
  size: number;
  url: string;
  proxy_url: string;
  height?: number | null;
  width?: number | null;
  /**
   * Ephemeral attachments will automatically be removed after a set period of time. Ephemeral attachments on messages
   * are guaranteed to be available as long as the message itself exists. */
  ephemeral?: boolean;
  duration_secs?: number;
  waveform?: string;
  /** Uses the enum: {@link APIAttachmentFlags} */
  flags?: number;
}

export interface APIMessageInteractionData {
  id: Snowflake;
  /** Uses the enum: {@link APIInteractionType} */
  type: number;
  name: string;
  user: APIUserData;
  member?: Partial<APIGuildMemberData>;
}

/** https://discord.com/developers/docs/resources/channel#reaction-object */
export interface APIReactionData {
  count: number;
  count_details: APIReactionCountDetailsData;
  me: boolean;
  me_burst: boolean;
  emoji: Partial<APIEmojiData>;
  burst_colors: unknown[];
}

/** https://discord.com/developers/docs/interactions/message-components#component-object */
export interface APIMessageComponents {
}

/** https://discord.com/developers/docs/reference#locales */
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

/** https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes */
export type APIOAuth2Scope =
  | "activities.read"
  | "activities.write"
  | "applications.builds.read"
  | "applications.builds.upload"
  | "applications.commands"
  | "applications.commands.update"
  | "applications.commands.permissions.update"
  | "applications.entitlements"
  | "applications.store.update"
  | "bot"
  | "connections"
  | "dm_channels.read"
  | "email"
  | "gdm.join"
  | "guilds"
  | "guilds.join"
  | "guilds.members.read"
  | "identify"
  | "messages.read"
  | "relationships.read"
  | "role_connections.write"
  | "rpc"
  | "rpc.activities.write"
  | "rpc.notifications.read"
  | "rpc.voice.read"
  | "rpc.voice.write"
  | "voice"
  | "webhook.incoming";

/** https://discord.com/developers/docs/resources/guild#guild-object-guild-features */
export type APIGuildFeatures =
  | "ANIMATED_BANNER"
  | "ANIMATED_ICON"
  | "APPLICATION_COMMAND_PERMISSIONS_V2"
  | "AUTO_MODERATION"
  | "BANNER"
  | "COMMUNITY"
  | "CREATOR_MONETIZABLE_PROVISIONAL"
  | "CREATOR_STORE_PAGE"
  | "DEVELOPER_SUPPORT_SERVER"
  | "DISCOVERABLE"
  | "FEATURABLE"
  | "INVITES_DISABLED"
  | "INVITE_SPLASH"
  | "MEMBER_VERIFICATION_GATE_ENABLED"
  | "MORE_STICKERS"
  | "NEWS"
  | "PARTNERED"
  | "PREVIEW_ENABLED"
  | "RAID_ALERTS_DISABLED"
  | "ROLE_ICONS"
  | "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE"
  | "ROLE_SUBSCRIPTIONS_ENABLED"
  | "TICKETED_EVENTS_ENABLED"
  | "VANITY_URL"
  | "VERIFIED"
  | "VIP_REGIONS"
  | "WELCOME_SCREEN_ENABLED";

/** https://discord.com/developers/docs/topics/gateway#client-status-object */
export declare type APIClientStatusData = Partial<
  Record<"desktop" | "mobile" | "web", APIPresenceUpdateStatusData>
>;

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

/** https://discord.com/developers/docs/resources/user#user-object-premium-types */
export declare const enum APIUserPremiumTypes {
  NONE = 0,
  NITRO_CLASSIC = 1,
  NITRO = 2,
  NITRO_BASIC = 3,
}

/** https://discord.com/developers/docs/resources/user#user-object-user-flags */
export declare const enum APIUserFlags {
  STAFF = 1 << 0,
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags */
export declare const enum APIGuildMemberFlags {
  DID_REJOIN = 1 << 0,
  COMPLETED_ONBOARDING = 1 << 1,
  BYPASSES_VERIFICATION = 1 << 2,
  STARTED_ONBOARDING = 1 << 3,
}

export declare const enum APIPresenceUpdateStatusData {
  Idle = "idle",
  DnD = "dnd",
  Online = "online",
  Offline = "offline",
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

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-types */
export declare const enum APIAutoModerationRuleActionType {
  BLOCK_MESSAGE = 1,
  SEND_ALERT_MESSAGE = 2,
  TIMEOUT = 3,
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level */
export declare const enum APIGuildScheduledEventPrivacyLevel {
  GUILD_ONLY = 2,
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status */
export declare const enum APIGuildScheduledEventStatus {
  SCHEDULED = 1,
  ACTIVE = 2,
  COMPLETED = 3,
  CANCELED = 4,
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types */
export declare const enum APIGuildScheduledEventEntityType {
  STAGE_INSTANCE = 1,
  VOICE = 2,
  EXTERNAL = 3,
}

export declare const enum APIIntegrationExpireBehavior {
  REMOVE_ROLE = 0,
  KICK = 1,
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

/** https://discord.com/developers/docs/resources/channel#message-object-message-types */
export declare const enum APIMessageType {
  DEFAULT = 0,
  RECIPIENT_ADD = 1,
  RECIPIENT_REMOVE = 2,
  CALL = 3,
  CHANNEL_NAME_CHANGE = 4,
  CHANNEL_ICON_CHANGE = 5,
  CHANNEL_PINNED_MESSAGE = 6,
  USER_JOIN = 7,
  GUILD_BOOST = 8,
  GUILD_BOOST_TIER_1 = 9,
  GUILD_BOOST_TIER_2 = 10,
  GUILD_BOOST_TIER_3 = 11,
  CHANNEL_FOLLOW_ADD = 12,
  GUILD_DISCOVERY_DISQUALIFIED = 14,
  GUILD_DISCOVERY_REQUALIFIED = 15,
  GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16,
  GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = 17,
  THREAD_CREATED = 18,
  REPLY = 19,
  CHAT_INPUT_COMMAND = 20,
  THREAD_STARTER_MESSAGE = 21,
  GUILD_INVITE_REMINDER = 22,
  CONTEXT_MENU_COMMAND = 23,
  /** Can only be deleted by members with `MANAGE_MESSAGES` permission */
  AUTO_MODERATION_ACTION = 24,
  ROLE_SUBSCRIPTION_PURCHASE = 25,
  INTERACTION_PREMIUM_UPSELL = 26,
  STAGE_START = 27,
  STAGE_END = 28,
  STAGE_SPEAKER = 29,
  STAGE_TOPIC = 31,
  GUILD_APPLICATION_PREMIUM_SUBSCRIPTION = 32,
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-types */
export declare const enum APIMessageActivityType {
  JOIN = 1,
  SPECTATE = 2,
  LISTEN = 3,
  JOIN_REQUEST = 5,
}

export declare const enum APIMessageFlags {
  CROSSPOSTED = 1 << 0,
  IS_CROSSPOST = 1 << 1,
  SUPPRESS_EMBEDS = 1 << 2,
  SOURCE_MESSAGE_DELETED = 1 << 3,
  URGENT = 1 << 4,
  HAS_THREAD = 1 << 5,
  EPHEMERAL = 1 << 6,
  LOADING = 1 << 7,
  FAILED_TO_MENTION_SOME_ROLES_IN_THREAD = 1 << 8,
  SUPPRESS_NOTIFICATIONS = 1 << 12,
  IS_VOICE_MESSAGE = 1 << 13,
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type */
export declare const enum APIInteractionType {
  PING = 1,
  APPLICATION_COMMAND = 2,
  MESSAGE_COMPONENT = 3,
  APPLICATION_COMMAND_AUTOCOMPLETE = 4,
  MODAL_SUBMIT = 5,
}

/** https://discord.com/developers/docs/topics/permissions#role-object-role-flags */
export declare const enum APIRoleFlags {
  IN_PROMPT = 1 << 0,
}

/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types */
export declare const enum APIWebhookType {
  INCOMING = 1,
  CHANNEL_FOLLOWER = 2,
  APPLICATION = 3,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-verification-level */
export declare const enum APIVerificationLevel {
  NONE = 0,
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  VERY_HIGH = 4,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level */
export declare const enum APIMessageNotifications {
  ALL_MESSAGES = 0,
  ONLY_MENTIONS = 1,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level */
export declare const enum APIExplicitContentFilter {
  DISABLED = 0,
  MEMBERS_WITHOUT_ROLES = 1,
  ALL_MEMBERS = 2,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-mfa-level */
export declare const enum APIMFALevel {
  NONE = 0,
  ELEVATED = 1,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags */
export declare const enum APISystemChannelFlags {
  SUPPRESS_JOIN_NOTIFICATIONS = 1 << 0,
  SUPPRESS_PREMIUM_SUBSCRIPTIONS = 1 << 1,
  SUPPRESS_GUILD_REMINDER_NOTIFICATIONS = 1 << 2,
  SUPPRESS_JOIN_NOTIFICATION_REPLIES = 1 << 3,
  SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS = 1 << 4,
  SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES = 1 << 5,
}

/** https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level */
export declare const enum APINSFWLevel {
  DEFAULT = 0,
  EXPLICIT = 1,
  SAFE = 2,
  AGE_RESTRICTED = 3,
}

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types */
export declare const enum APIStickerType {
  STANDARD = 1,
  GUILD = 2,
}

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types */
export declare const enum APIStickerFormatType {
  PNG = 1,
  APNG = 2,
  LOTTIE = 3,
  GIF = 4,
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-types */
export declare const enum APIEmbedType {
  RICH = "rich",
  IMAGE = "image",
  VIDEO = "video",
  GIFV = "gifv",
  ARTICLE = "article",
  LINK = "link",
}

/** https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types */
export declare const enum APIInviteTargetType {
  STREAM = 1,
  EMBEDDED_APPLICATION = 2,
}

export declare const enum APIAttachmentFlags {
  IS_REMIX = 1 << 2,
}

/** https://discord.com/developers/docs/reference#locales */
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

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-limits */
export const EmbedLimits = {
  title: 256,
  "author.name": 256,
  description: 4096,
  fields: 25,
  "fields.name": 256,
  "fields.value": 1024,
  "footer.text": 2048,
};
