import { HeritageFeatureCollection } from
  "../types/heritageObj/HeritageFeatureCollection";

import { HeritageFilters } from
  "../types/heritageObj/HeritageFilters";

import {
  resolveHeritageLegendGroup,
} from "./resolveHeritageLegendGroup";

import {
  resolveHeritageTypeGroup,
} from "../config/heritageTypeConfig";

export function filterHeritageData(
  data: HeritageFeatureCollection,
  filters: HeritageFilters,
): HeritageFeatureCollection {
  return {
    ...data,
    features: data.features.filter((feature) => {
      const status = resolveHeritageLegendGroup(
        feature.properties,
      );

      const type = resolveHeritageTypeGroup(
        feature.properties.objType,
      );

      const statusVisible =
        status === null ||
        filters.statuses[status];

      const typeVisible =
        type === null ||
        filters.types[type];

      return statusVisible && typeVisible;
    }),
  };
}