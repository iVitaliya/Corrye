/** https://discord.com/developers/docs/topics/gateway#activity-object */
export interface APIActivityData {
	name: string;
	type: ActivityType;
	url?: string | null;
	created_at: number;
	timestamps?: APIActivityDataTimestamp;
	application_id?: string;
	details?: string | null;
	state?: string | null;
	emoji?: APIActivityDataEmoji | null;
	party?: APIActivityDataParty;
	assets?: APIActivityDataAssets;
	secrets?: APIActivityDataSecrets;
	instance?: boolean;
	flags?: ActivityFlags;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-timestamps */
export interface APIActivityDataTimestamp {
	start?: number;
	end?: number;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji */
export interface APIActivityDataEmoji {
	name: string;
	id?: string;
	animated?: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-party */
export interface APIActivityDataParty {
	id?: string;
	size?: [number, number];
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-assets */
export interface APIActivityDataAssets {
	large_image?: string;
	large_text?: string;
	small_image?: string;
	small_text?: string;
}

/** https://discord.com/developers/docs/topics/gateway#activity-object-activity-secrets */
export interface APIActivityDataSecrets {
	join?: string;
	spectate?: string;
	match?: string;
}


/** https://discord.com/developers/docs/resources/audit-log#audit-log-object */
export interface APIAuditLogData {
	webhooks: APIWebhookData[];
	users: APIUserData[];
	audit_log_entries: APIAuditLogEntryData[];
	integrations: Partial<APIIntegrationData>[];
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
	type?: 'member' | 'role';
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