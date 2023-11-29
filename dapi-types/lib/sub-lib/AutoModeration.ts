import {
  APIAutoModerationRuleActionType,
  APIAutoModerationRuleKeywordPreset,
  Snowflake,
} from "../DiscordAPITypes.ts";

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata */
export interface APIAutoModerationRuleMetadataData {
  keyword_filter: string[];
  regex_patterns: string[];
  presets: APIAutoModerationRuleKeywordPreset;
  allow_list: string[];
  mention_total_limit: number;
  mention_raid_protection_enabled: boolean;
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-metadata */
export interface APIAutoModerationRuleActionMetadataData {
  channel_id: Snowflake;
  duration_seconds: number;
  custom_message?: string;
}

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-auto-moderation-action-structure */
export interface APIAutoModerationRuleActionData {
  type: APIAutoModerationRuleActionType;
  metadata?: APIAutoModerationRuleActionMetadataData;
}
