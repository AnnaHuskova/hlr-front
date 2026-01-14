import maplibregl from "maplibre-gl";
import { heritageColorExpr } from "./heritageColorExpr";

export function addHeritageLayers(map: maplibregl.Map) {

  // POLYGONS (fill, exp - urban_planning)
  map.addLayer({
    id: "heritage-polygons-fill",
    type: "fill",
    source: "heritage",
    filter: [
      "all",
      ["==", "$type", "Polygon"],
      ["!=", "objType", "urban_planning"]
    ],
    paint: {
      "fill-color": heritageColorExpr,
      "fill-opacity": 0.45
    }
  });

  // 🧱 POLYGON OUTLINES 
  map.addLayer({
    id: "heritage-polygons-outline",
    type: "line",
    source: "heritage",
    filter: ["==", "$type", "Polygon"],
    paint: {
      "line-color": "#000000",
      "line-width": 0
    }
  });

  //  urban_planning — ТОЛЬКО КОНТУР (НИЖЕ остальных)
  map.addLayer(
    {
      id: "heritage-urban-planning-outline",
      type: "line",
      source: "heritage",
      filter: [
        "all",
        ["==", "$type", "Polygon"],
        ["==", "objType", "urban_planning"]
      ],
      paint: {
        "line-color": "#d000ff",
        "line-width": 2
      }
    },
    "heritage-polygons-fill"
  );

  // 📍 POINTS
  map.addLayer({
    id: "heritage-points",
    type: "circle",
    source: "heritage",
    filter: ["==", "$type", "Point"],
    paint: {
      "circle-radius": 6,
      "circle-color": heritageColorExpr,
      "circle-stroke-color": "#000000",
      "circle-stroke-width": 0
    }
  });
}
