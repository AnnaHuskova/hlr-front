import type { HeritageDisplayStatus } from "../../controllers/resolveHeritageDisplayStatus";

export interface HeritageFeatureSummary {
  id: string;
  name: string;
  displayStatus: HeritageDisplayStatus;
  statusLabel: string;
  typeLabel: string;
  date: string | null;
  shortDescription: string | null;
  decision: string | null;
}
