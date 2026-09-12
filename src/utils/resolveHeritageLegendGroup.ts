import { HeritageProperties } from
  "../types/heritageObj/HeritageFeatureCollection";

import { HERITAGE_LEGEND } from
  "../config/heritageLegendConfig";

export type HeritageLegendId =
  (typeof HERITAGE_LEGEND)[number]["id"];

export function resolveHeritageLegendGroup(
  properties: HeritageProperties,
): HeritageLegendId | null {
  if (properties.objType === "garden_park") {
    return "garden_park";
  }

  if (properties.objType === "urban_planning") {
    return "urban_planning";
  }

  if (properties.isProposed === true) {
    return "isProposed";
  }

  if (properties.isHeritage === true) {
    return "isHeritage";
  }

  if (properties.historicalValue === "significant") {
    return "significant";
  }

  if (properties.historicalValue === "ordinary") {
    return "ordinary";
  }

  return null;
}