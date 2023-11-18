import {
  APIApplicationCommandDataOptionType,
  APIChannelType,
  LocalesType,
} from "../../mod.ts";

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure */
export interface APIApplicationCommandOptionData {
  type: APIApplicationCommandDataOptionType;
  name: string;
  name_localizations?: LocalesType | null;
  description: string;
  description_localizations?: LocalesType | null;
  required?: boolean;
  choices?: APIApplicationCommandOptionChoiceData[];
  options?: APIApplicationCommandOptionData[];
  channel_type?: APIChannelType[];
  min_value?: number;
  max_value?: number;
  min_length?: number;
  max_length?: number;
  /**
   * If autocomplete interactions are enabled for this `STRING`, `INTEGER`, or `NUMBER` type option
   * - `autocomplete` may not be set to true if `choices` are present. */
  autocomplete?: boolean;
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-choice-structure */
export interface APIApplicationCommandOptionChoiceData {
  name: string;
  name_localizations?: LocalesType;
  /** Value for the choice, up to 100 characters if string */
  value: string | number;
}
