import { HERITAGE_LEGEND } from
  "../../config/heritageLegendConfig";

import {
  HERITAGE_TYPE_GROUPS,
  HeritageTypeGroupId,
} from "../../config/heritageTypeConfig";

import type {
  HeritageLegendId,
} from "../../utils/resolveHeritageLegendGroup";

export interface HeritageFilters {
  statuses: Record<HeritageLegendId, boolean>;
  types: Record<HeritageTypeGroupId, boolean>;
}

const statuses = Object.fromEntries(
  HERITAGE_LEGEND.map((item) => [item.id, true]),
) as Record<HeritageLegendId, boolean>;

const types = Object.fromEntries(
  HERITAGE_TYPE_GROUPS.map((item) => [item.id, true]),
) as Record<HeritageTypeGroupId, boolean>;

export const DEFAULT_HERITAGE_FILTERS: HeritageFilters = {
  statuses,
  types,
};