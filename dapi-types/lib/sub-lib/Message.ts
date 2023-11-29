import { APIMessageActivityType, Snowflake } from "../DiscordAPITypes.ts";

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure */
export interface APIMessageActivityData {
  /** Uses the enum: {@link APIMessageActivityType} */
  type: number;
  /** Reference: https://discord.com/developers/docs/rich-presence/how-to#updating-presence-update-presence-payload-fields */
  party_id?: string;
}

/** https://discord.com/developers/docs/resources/channel#message-reference-object-message-reference-structure */
export interface APIMessageReferenceData {
  message_id?: Snowflake;
  channel_id?: Snowflake;
  guild_id?: Snowflake;
  /**
   * `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.
   *
   * **Message Types**
   *
   * There are multiple message types that have a message_reference object. Since message references are generic attribution
   * to a previous message, there will be more types of messages which have this information in the future.
   *
   * **Crosspost messages**
   * - These are messages that originated from another channel (IS_CROSSPOST flag).
   * - These messages have all three fields, which point to the original message that was crossposted.
   *
   * **Channel Follow Add messages**
   * - These are automatic messages sent when a channel is followed into the current channel (type 12).
   * - These messages have the `channel_id` and `guild_id` fields, which point to the followed announcement channel.
   *
   * **Pin Messages**
   * - These are automatic messages sent when a message is pinned (type 6).
   * - These messages have `message_id` and `channel_id`, and `guild_id` if it is in a guild, which point to the message that was pinned.
   *
   * **Replies**
   * - These are messages replying to a previous message (type 19).
   * - These messages have `message_id` and `channel_id`, and `guild_id` if it is in a guild, which point to the message that was replied to. The `channel_id` and `guild_id` will be the same as the reply.
   * - Replies are created by including a message_reference when sending a message. When sending, only `message_id` is required.
   *
   * **Thread Created Messages**
   * - These are automatic messages sent when a public thread is created from an old message or without a message (type 18).
   * - These messages have the `channel_id` and `guild_id` fields, which point to the created thread channel.
   *
   * **Thread starter messages**
   * - These are the first message in public threads created from messages. They point back to the message in the parent channel from which the thread was started. (type 21)
   * - These messages have `message_id`, `channel_id`, and `guild_id`.
   * - These messages will never have content, embeds, or attachments, mainly just the `message_reference` and `referenced_message` fields.
   *
   * **Voice Messages**
   *
   * Voice messages are messages with the IS_VOICE_MESSAGE flag. They have the following properties.
   * - They cannot be edited.
   * - Only a single audio attachment is allowed. No content, stickers, etc...
   * - The {@link https://discord.com/developers/docs/resources/channel#attachment-object attachment} has additional fields: `duration_secs` and `waveform`.
   *
   * The `waveform` is intended to be a preview of the entire voice message, with 1 byte per datapoint encoded in base64.
   * Clients sample the recording at most once per 100 milliseconds, but will downsample so that no more than 256 datapoints
   * are in the waveform.
   *
   * As of 2023-04-14, clients upload a 1 channel, 48000 Hz, 32kbps Opus stream in an OGG container. The encoding, and the
   * waveform details, are an implementation detail and may change without warning or documentation. */
  fail_if_not_exists?: boolean;
}
