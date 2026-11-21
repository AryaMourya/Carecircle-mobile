export type DoseStatus = "PENDING" | "ACKNOWLEDGED" | "SKIPPED";

// Matches caregiver_relationships in the schema. Pick ONE naming set across the app.
export type CaregiverRole = "PRIMARY_ADMIN" | "SECONDARY_CAREGIVER";
export type Permission = "FULL_ACCESS" | "READ_ONLY";

export interface DoseReminder {
  id: string;
  scheduled_for: string; // ISO timestamp
  status: DoseStatus;
  acknowledged_at: string | null;
  name: string;
  dosage: string;
  instructions: string | null;
}

export const canEdit = (p: Permission) => p === "FULL_ACCESS";
