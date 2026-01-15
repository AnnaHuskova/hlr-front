import type { ExpressionSpecification } from "maplibre-gl";

export const heritageColorExpr: ExpressionSpecification = [
  "case",

  // 🌳 garden park
  ["==", ["get", "objType"], "garden_park"],
  "#2ecc71",

  ["==", ["get", "objType"], "local_sculpture"],
  "#2eccc4",

  ["==", ["get", "objType"], "local_monument"],
  "#00fff2",

  // 🟣 proposed
  ["==", ["get", "isProposed"], true],
  "#7a00ff",

  // 💗 heritage
  ["==", ["get", "isHeritage"], true],
  "#d000ff",

  // 🟡 significant
  ["==", ["get", "historicalValue"], "significant"],
  "#d1a514",

  // 🟨 ordinary
  ["==", ["get", "historicalValue"], "ordinary"],
  "#fbff00",

  // fallback
  "#cccccc",
];
