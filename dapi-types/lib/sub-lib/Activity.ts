import { Snowflake } from "../DiscordAPITypes.ts";

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
