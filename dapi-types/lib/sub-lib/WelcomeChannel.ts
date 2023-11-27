import { Snowflake } from "../DAPITypes.ts";

/** https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-channel-structure */
export interface APIWelcomeScreenChannelData {
	channel_id: Snowflake;
	description: string;
	emoji_id: Snowflake | null;
	emoji_name: string | null;
}