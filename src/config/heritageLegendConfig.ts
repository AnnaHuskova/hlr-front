import { HERITAGE_COLORS } from "./heritageStyle";
import type { HeritageProperties } from "../types/heritageObj/HeritageFeatureCollection";

export const HERITAGE_LEGEND = [
  {
    id: "garden_park",
    translationKey: "legend.gardenPark",
    color: HERITAGE_COLORS.garden_park,
    geometry: "polygon",

    matches: (properties: HeritageProperties) =>
      properties.objType === "garden_park",
  },

  {
    id: "isProposed",
    translationKey: "legend.proposed",
    color: HERITAGE_COLORS.isProposed,
    geometry: "polygon-point",

    matches: (properties: HeritageProperties) =>
      properties.isProposed === true,
  },

  {
    id: "isHeritage",
    translationKey: "legend.heritage",
    color: HERITAGE_COLORS.isHeritage,
    geometry: "polygon-point",

    matches: (properties: HeritageProperties) =>
      properties.isHeritage === true,
  },

  {
    id: "significant",
    translationKey: "legend.significant",
    color: HERITAGE_COLORS.significant,
    geometry: "polygon-point",

    matches: (properties: HeritageProperties) =>
      properties.historicalValue === "significant",
  },

  {
    id: "ordinary",
    translationKey: "legend.ordinary",
    color: HERITAGE_COLORS.ordinary,
    geometry: "polygon-point",

    matches: (properties: HeritageProperties) =>
      properties.historicalValue === "ordinary",
  },

  {
    id: "urban_planning",
    translationKey: "legend.urbanPlanning",
    color: HERITAGE_COLORS.isHeritage,
    geometry: "outline-only",

    matches: (properties: HeritageProperties) =>
      properties.objType === "urban_planning",
  },
] as const;