/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-metadata */
export interface APIGuildScheduledEventEntityMetadataData {
  /****required** for events with `'entity_type': EXTERNAL` */
  location?: string;
}
