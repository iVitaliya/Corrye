// deno-lint-ignore-file no-explicit-any
import { APIAuditLogEvent, Snowflake } from "../DAPITypes.ts";

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object */
export interface APIAuditLogEntryData {
  target_id: string | null;
  changes?: APIAuditLogChangeData[];
  user_id: Snowflake | null;
  id: Snowflake;
  action_type: APIAuditLogEvent;
  options?: APIAuditLogOptionsData;
  reason?: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure */
export interface APIAuditLogChangeData {
  new_value?: any;
  old_value?: any;
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
  type?: "member" | "role";
  role_name?: string;
}
