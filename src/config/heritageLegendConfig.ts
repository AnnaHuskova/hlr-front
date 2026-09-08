import { HERITAGE_COLORS } from "./heritageStyle";

export const HERITAGE_LEGEND = [
  {
    id: "garden_park",
    translationKey: "legend.gardenPark",
    color: HERITAGE_COLORS.garden_park,
    geometry: "polygon",
  },
  {
    id: "isProposed",
    translationKey: "legend.proposed",
    color: HERITAGE_COLORS.isProposed,
    geometry: "polygon-point",
  },
  {
    id: "isHeritage",
    translationKey: "legend.heritage",
    color: HERITAGE_COLORS.isHeritage,
    geometry: "polygon-point",
  },
  {
    id: "significant",
    translationKey: "legend.significant",
    color: HERITAGE_COLORS.significant,
    geometry: "polygon-point",
  },
  {
    id: "ordinary",
    translationKey: "legend.ordinary",
    color: HERITAGE_COLORS.ordinary,
    geometry: "polygon-point",
  },
  {
    id: "urban_planning",
    translationKey: "legend.urbanPlanning",
    color: HERITAGE_COLORS.isHeritage,
    geometry: "outline-only",
  },
] as const;
