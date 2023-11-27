/** https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure */
export interface APIEmbedFooterData {
	text: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure */
export interface APIEmbedImageData {
	url: string;
	proxy_url?: string;
	height?: number;
	weight?: number;
}

