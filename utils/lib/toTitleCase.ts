const TOTITLECASE = /[A-Za-zÀ-ÖØ-öø-ÿ]\S*/g;
const titleCaseVariants: Record<string, string> = {
  categoryChannel: "CategoryChannel",
  textChannel: "TextChannel",
  publicThreadChannel: "PublicThreadChannel",
  privateThreadChannel: "PrivateThreadChannel",
  voiceChannel: "VoiceChannel",
  stageChannel: "StageChannel",
  newsChannel: "NewsChannel",
  guildMember: "GuildMember",
};

/**
 * Converts a string to Title Case.
 * @param str The string to title case. */
export function toTitleCase(str: string): string {
  return str.replace(
    TOTITLECASE,
    (txt) =>
      titleCaseVariants[txt] ||
      txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
  );
}
