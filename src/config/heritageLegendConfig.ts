import { HERITAGE_COLORS } from "./heritageStyle";

export const HERITAGE_LEGEND = [
  {
    id: "garden_park",
    label: "Сад / парк",
    color: HERITAGE_COLORS.garden_park,
    geometry: "polygon",
  },
  {
    id: "isProposed",
    label: "Запропонований обʼєкт",
    color: HERITAGE_COLORS.isProposed,
    geometry: "polygon-point",
  },
  {
    id: "isHeritage",
    label: "Обʼєкт культурної спадщини",
    color: HERITAGE_COLORS.isHeritage,
    geometry: "polygon-point",
  },
  {
    id: "significant",
    label: "Значні історичні будівлі",
    color: HERITAGE_COLORS.significant,
    geometry: "polygon-point",
  },
  {
    id: "ordinary",
    label: "Рядові історичні будівлі",
    color: HERITAGE_COLORS.ordinary,
    geometry: "polygon-point",
  },
  {
    id: "urban_planning",
    label: "Містобудівна структура",
    color: HERITAGE_COLORS.isHeritage,
    geometry: "outline-only",
  },
] as const;
