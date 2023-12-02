import { BitField } from "../../../mod.ts";

export declare const enum IntentsBits {
  /**
   * - GUILD_CREATE
   * - GUILD_UPDATE
   * - GUILD_DELETE
   * - GUILD_ROLE_CREATE
   * - GUILD_ROLE_UPDATE
   * - GUILD_ROLE_DELETE
   * - CHANNEL_CREATE
   * - CHANNEL_UPDATE
   * - CHANNEL_DELETE
   * - CHANNEL_PINS_UPDATE
   * - THREAD_CREATE
   * - THREAD_UPDATE
   * - THREAD_DELETE
   * - THREAD_LIST_SYNC
   * - THREAD_MEMBER_UPDATE
   * - THREAD_MEMBERS_UPDATE
   * >(Thread Members Update contains different data depending on which intents are used.)
   * - STAGE_INSTANCE_CREATE
   * - STAGE_INSTANCE_UPDATE
   * - STAGE_INSTANCE_DELETE */
  GUILDS = 1 << 0,
  /**
   * Events under the `GUILD_PRESENCES` and `GUILD_MEMBERS` intents are turned **off by default on all API versions.**
   *
   * - GUILD_MEMBER_ADD
   * - GUILD_MEMBER_UPDATE
   * - GUILD_MEMBER_REMOVE
   * - THREAD_MEMBERS_UPDATE
   * >(Thread Members Update contains different data depending on which intents are used.) */
  GUILD_MEMBERS = 1 << 1,
  /**
   * - GUILD_AUDIT_LOG_ENTRY_CREATE
   * - GUILD_BAN_ADD
   * - GUILD_BAN_REMOVE */
  GUILD_MODERATION = 1 << 2,
  /**
   * - GUILD_EMOJIS_UPDATE
   * - GUILD_STICKERS_UPDATE */
  GUILD_EMOJIS_AND_STICKERS = 1 << 3,
  /**
   * - GUILD_INTEGRATIONS_UPDATE
   * - INTEGRATION_CREATE
   * - INTEGRATION_UPDATE
   * - INTEGRATION_DELETE */
  GUILD_INTEGRATIONS = 1 << 4,
  /** - WEBHOOKS_UPDATE */
  GUILD_WEBHOOKS = 1 << 5,
  /**
   * - INVITE_CREATE
   * - INVITE_DELETE */
  GUILD_INVITES = 1 << 6,
  /** - VOICE_STATE_UPDATE */
  GUILD_VOICE_STATES = 1 << 7,
  /**
   * Events under the `GUILD_PRESENCES` and `GUILD_MEMBERS` intents are turned **off by default on all API versions.**
   *
   * - PRESENCE_UPDATE */
  GUILD_PRESENCES = 1 << 8,
  /**
   * - MESSAGE_CREATE
   * - MESSAGE_UPDATE
   * - MESSAGE_DELETE
   * - MESSAGE_DELETE_BULK */
  GUILD_MESSAGES = 1 << 9,
  /**
   * - MESSAGE_REACTION_ADD
   * - MESSAGE_REACTION_REMOVE
   * - MESSAGE_REACTION_REMOVE_ALL
   * - MESSAGE_REACTION_REMOVE_EMOJI */
  GUILD_MESSAGE_REACTIONS = 1 << 10,
  /** - TYPING_START */
  GUILD_MESSAGE_TYPING = 1 << 11,
  /**
   * - MESSAGE_CREATE
   * - MESSAGE_UPDATE
   * - MESSAGE_DELETE
   * - CHANNEL_PINS_UPDATE */
  DIRECT_MESSAGES = 1 << 12,
  /**
   * - MESSAGE_REACTION_ADD
   * - MESSAGE_REACTION_REMOVE
   * - MESSAGE_REACTION_REMOVE_ALL
   * - MESSAGE_REACTION_REMOVE_EMOJI */
  DIRECT_MESSAGE_REACTIONS = 1 << 13,
  /** - TYPING_START */
  DIRECT_MESSAGE_TYPING = 1 << 14,
  /**
   * `MESSAGE_CONTENT` does not represent individual events, but rather
   * affects what data is present for events that could contain message
   * content fields. More information is in the {@link https://discord.com/developers/docs/topics/gateway#message-content-intent message content intent} section. */
  MESSAGE_CONTENT = 1 << 15,
  /**
   * - GUILD_SCHEDULED_EVENT_CREATE
   * - GUILD_SCHEDULED_EVENT_UPDATE
   * - GUILD_SCHEDULED_EVENT_DELETE
   * - GUILD_SCHEDULED_EVENT_USER_ADD
   * - GUILD_SCHEDULED_EVENT_USER_REMOVE */
  GUILD_SCHEDULED_EVENTS = 1 << 16,
  /**
   * - AUTO_MODERATION_RULE_CREATE
   * - AUTO_MODERATION_RULE_UPDATE
   * - AUTO_MODERATION_RULE_DELETE */
  AUTO_MODERATION_CONFIGURATION = 1 << 20,
  /** - AUTO_MODERATION_ACTION_EXECUTION */
  AUTO_MODERATION_EXECUTION = 1 << 21,
}

export declare const enum IntentsFlags {
  Guilds = "GUILDS",
  GuildMembers = "GUILD_MEMBERS",
  GuildModeration = "GUILD_MODERATION",
  GuildEmojisAndStickers = "GUILD_EMOJIS_AND_STICKERS",
  GuildIntegrations = "GUILD_INTEGRATIONS",
  GuildWebhooks = "GUILD_WEBHOOKS",
  GuildInvites = "GUILD_INVITES",
  GuildVoiceStatus = "GUILD_VOICE_STATES",
  GuildPresences = "GUILD_PRESENCES",
  GuildMessages = "GUILD_MESSAGES",
  GuildMessageReactions = "GUILD_MESSAGE_REACTIONS",
  GuildMessageTyping = "GUILD_MESSAGE_TYPING",
  DirectMessages = "DIRECT_MESSAGES",
  DirectMessageReactions = "DIRECT_MESSAGE_REACTIONS",
  DirectMessageTyping = "DIRECT_MESSAGE_TYPING",
  MessageContent = "MESSAGE_CONTENT",
  GuildScheduledEvents = "GUILD_SCHEDULED_EVENTS",
  AutoModerationConfiguration = "AUTO_MODERATION_CONFIGURATION",
  AutoModerationExecution = "AUTO_MODERATION_EXECUTION",
}

export declare type IntentsResolvable =
  | IntentsFlags
  | IntentsBits
  | number
  | BitField.BitFieldObject
  | (IntentsFlags | IntentsBits | number | BitField.BitFieldObject)[];

/** Handles Gateway Intents in Project-Blue. */
export declare class Intents extends BitField.BitField<IntentsResolvable> {
}
