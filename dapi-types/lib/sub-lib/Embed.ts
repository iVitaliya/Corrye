/** https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure */
export interface APIEmbedThumbnailData {
	url: string;
	proxy_url: string;
	height: number;
	width: number;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure */
export interface APIEmbedVideoData {
	url: string;
	proxy_url: string;
	height: number;
	width: number;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure */
export interface APIEmbedImageData {
	url: string;
	proxy_url: string;
	height: number;
	width: number;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure */
export interface APIEmbedProviderData {
	name: string;
	url: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure */
export interface APIEmbedAuthorData {
	name: string;
	url: string;
	
}