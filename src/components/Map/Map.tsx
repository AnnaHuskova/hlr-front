import { useEffect, useRef } from "react";
import maplibregl, { MapGeoJSONFeature } from "maplibre-gl";
import type { GeoJSON } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { CITIES, CityId } from "../../config/cities";
import { HeritageFeatureCollection } from "../../types/heritageObj/HeritageFeatureCollection";
import { addHeritageLayers } from "../../styles/addHeritageLayers";
interface MapProps {
  cityId: CityId;
  heritageData: HeritageFeatureCollection;
  onFeatureClick?: (
    feature: MapGeoJSONFeature,
    lngLat: maplibregl.LngLatLike,
  ) => void;
  onEmptyClick?: (lngLat: maplibregl.LngLatLike) => void;
  onMapReady?: (map: maplibregl.Map) => void;
  routeGeojson?: GeoJSON.Feature<GeoJSON.LineString> | null;
}

export function Map({
  cityId,
  heritageData,
  onFeatureClick,
  onEmptyClick,
  onMapReady,
  routeGeojson,
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const clickLayersRef = useRef([
    "heritage-polygons-fill",
    "heritage-polygons-outline",
    "heritage-urban-planning-outline",
    "heritage-points",
  ]);

  const isDraggingRef = useRef(false);
  
  /* ======================================================
     1. CREATE MAP (ONCE)
     ====================================================== */
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://tile.openstreetmap.org.ua/styles/positron-gl-style/style.json",
      center: CITIES[cityId].center,
      zoom: CITIES[cityId].zoom,
      maxBounds: CITIES[cityId].bounds,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-left");
    map.addControl(new maplibregl.ScaleControl({ unit: "metric" }), "bottom-left");

    map.on("load", () => {
      map.addSource("heritage", {
        type: "geojson",
        data: heritageData,
      });

      addHeritageLayers(map);
    });

    mapRef.current = map;
    onMapReady?.(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  /* ======================================================
     2. UPDATE DATA (EVERY TIME heritageData CHANGES)
     ====================================================== */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const source = map.getSource("heritage") as maplibregl.GeoJSONSource | undefined;
    if (!source) return;

    source.setData(heritageData);
  }, [heritageData]);

  /* ======================================================
     3. MOVE MAP WHEN CITY CHANGES
     ====================================================== */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const city = CITIES[cityId];

    map.setMaxBounds(city.bounds);
    map.fitBounds(city.bounds, {
      padding: 40,
      duration: 800,
    });
  }, [cityId]);

 /* ======================================================
     4. HANDLE MAP CLICKS
     ====================================================== */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const handleClick = (event: maplibregl.MapMouseEvent) => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        return;
      }
      const features = map.queryRenderedFeatures(event.point, {
        layers: clickLayersRef.current,
      });

      if (!features.length) {
        onEmptyClick?.(event.lngLat);
        return;
      }

      onFeatureClick?.(features[0], event.lngLat);
    };

    const handleMove = (event: maplibregl.MapMouseEvent) => {
      const features = map.queryRenderedFeatures(event.point, {
        layers: clickLayersRef.current,
      });
      map.getCanvas().style.cursor = features.length ? "pointer" : "";
    };

    const handleDragStart = () => {
      isDraggingRef.current = true;
    };

    const handleDragEnd = () => {
      window.setTimeout(() => {
        isDraggingRef.current = false;
      }, 0);
    };

    map.on("click", handleClick);
    map.on("mousemove", handleMove);
    map.on("dragstart", handleDragStart);
    map.on("dragend", handleDragEnd);

    return () => {
      map.off("click", handleClick);
      map.off("mousemove", handleMove);
      map.off("dragstart", handleDragStart);
      map.off("dragend", handleDragEnd);
      map.getCanvas().style.cursor = "";
    };
  }, [onEmptyClick, onFeatureClick]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const sourceId = "excursion-route";
    const layerId = "excursion-route-line";

    const applyRoute = () => {
      if (!routeGeojson) {
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId);
        }
        if (map.getSource(sourceId)) {
          map.removeSource(sourceId);
        }
        return;
      }

      const existingSource = map.getSource(sourceId) as
        | maplibregl.GeoJSONSource
        | undefined;

      if (!existingSource) {
        map.addSource(sourceId, {
          type: "geojson",
          data: routeGeojson,
        });
      } else {
        existingSource.setData(routeGeojson);
      }

      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          type: "line",
          source: sourceId,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#22c55e",
            "line-width": 4,
            "line-opacity": 0.9,
          },
        });
      }
    };

    if (map.isStyleLoaded()) {
      applyRoute();
      return;
    }

    map.once("load", applyRoute);
    return () => {
      map.off("load", applyRoute);
    };
  }, [routeGeojson]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
}
