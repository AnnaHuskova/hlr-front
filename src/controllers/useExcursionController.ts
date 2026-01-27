import { useCallback, useEffect, useMemo, useState } from "react";
import { LngLatLike, MapGeoJSONFeature } from "maplibre-gl";
import type { GeoJSON } from "geojson";
import { CityId } from "../config/cities";
import { HeritageFeatureSummary } from "../types/heritageObj/HeritageFeatureSummary";
import { resolveHeritageDisplayStatus } from "./resolveHeritageDisplayStatus";

type ExcursionStartMode = "manual" | "geolocation";
interface ExcursionControllerState {
  selectedFeature: HeritageFeatureSummary | null;
  selectedLocation: LngLatLike | null;
  excursionItems: HeritageFeatureSummary[];
  isExcursionActive: boolean;
  isSelectingStart: boolean;
  isStartModalOpen: boolean;
  isBuildingRoute: boolean;
  routeError: string | null;
  routeGeojson: GeoJSON.Feature<GeoJSON.LineString> | null;
  handleFeatureClick: (
    feature: MapGeoJSONFeature,
    lngLat: LngLatLike,
  ) => void;
  handleEmptyClick: (lngLat: LngLatLike) => void;
  handleToggleExcursion: () => void;
  handleRemoveItem: (id: string) => void;
  handleClearItems: () => void;
  handleBuildRouteRequest: () => void;
  handleSelectStartManual: () => void;
  handleSelectStartGeolocation: () => void;
  handleCancelStartSelection: () => void;
  closeSelectedFeature: () => void;
}

export function useExcursionController(cityId: CityId): ExcursionControllerState {
  const [selectedFeature, setSelectedFeature] =
    useState<HeritageFeatureSummary | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LngLatLike | null>(
    null,
  );
  const [excursionItems, setExcursionItems] = useState<
    HeritageFeatureSummary[]
  >([]);
  const [isExcursionActive, setIsExcursionActive] = useState(false);
  const [isSelectingStart, setIsSelectingStart] = useState(false);
  const [startMode, setStartMode] = useState<ExcursionStartMode | null>(null);
  const [routeGeojson, setRouteGeojson] =
    useState<GeoJSON.Feature<GeoJSON.LineString> | null>(null);
  const [isBuildingRoute, setIsBuildingRoute] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);

  const readString = useCallback((value: unknown) => {
    if (typeof value !== "string") {
      return null;
    }
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }, []);

  const readNumber = useCallback((value: unknown) => {
    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
    return null;
  }, []);

  const resolveStatusLabel = useCallback((properties: Record<string, unknown>) => {
    const heritageLevel =
      properties.heritageLevel === "national" ||
      properties.heritageLevel === "local"
        ? properties.heritageLevel
        : null;

    if (heritageLevel === "national") {
      return "Памʼятка нац. значення";
    }

    if (heritageLevel === "local") {
      return "Памʼятка місцевого значення";
    }

    const displayStatus = resolveHeritageDisplayStatus(properties);
    return displayStatus.label;
  }, []);

  const resolveTypeLabel = useCallback((properties: Record<string, unknown>) => {
    const objType = properties.objType;
    switch (objType) {
      case "architecture":
      case "urban_planning":
      case "garden_park":
      case "landscape":
      case "local_place":
      case "local_element":
      case "viewpoint":
        return "Архітектури";
      case "archaeology":
        return "Археології";
      case "history":
      case "history_monumental":
      case "monument":
      case "memorial":
      case "local_monument":
      case "local_sculpture":
      case "local_art":
        return "Монументального мистецтва";
      default:
        return "Невідомий тип";
    }
  }, []);

  const toLngLatTuple = (lngLat: LngLatLike): [number, number] => {
    if (Array.isArray(lngLat)) {
      return [lngLat[0], lngLat[1]];
    }

    if ("lng" in lngLat && "lat" in lngLat) {
      return [lngLat.lng, lngLat.lat];
    }

    return [0, 0];
  };

  const averageCoords = useCallback((coords: number[][]): [number, number] | null => {
    if (!coords.length) {
      return null;
    }
    const filtered = coords.filter(
      (coord) => coord.length >= 2 && Number.isFinite(coord[0]) && Number.isFinite(coord[1]),
    );
    if (!filtered.length) {
      return null;
    }
    const [lngSum, latSum] = filtered.reduce(
      (acc, coord) => [acc[0] + coord[0], acc[1] + coord[1]],
      [0, 0],
    );
    return [lngSum / filtered.length, latSum / filtered.length];
  }, []);

  const resolveFeaturePoint = useCallback(
    (geometry: GeoJSON.Geometry): [number, number] | null => {
      switch (geometry.type) {
        case "Point":
          return geometry.coordinates as [number, number];
        case "MultiPoint":
          return averageCoords(geometry.coordinates as number[][]);
        case "LineString":
          return averageCoords(geometry.coordinates as number[][]);
        case "MultiLineString":
          return averageCoords(geometry.coordinates[0] as number[][]);
        case "Polygon":
          return averageCoords(geometry.coordinates[0] as number[][]);
        case "MultiPolygon":
          return averageCoords(geometry.coordinates[0][0] as number[][]);
        default:
          return null;
      }
    },
    [averageCoords],
  );

  const buildFeatureSummary = useCallback(
    (feature: MapGeoJSONFeature) => {
      const properties = (feature.properties ?? {}) as Record<string, unknown>;
      const rawId =
        readString(feature.id) ??
        readNumber(feature.id) ??
        readString(properties._id) ??
        readNumber(properties._id) ??
        readString(properties.id) ??
        readNumber(properties.id) ??
        readString(properties.objectId) ??
        readNumber(properties.objectId) ??
        readString(properties.objId) ??
        readNumber(properties.objId) ??
        `${readString(properties.name) ?? "feature"}-${
          readString(properties.cityId) ?? "city"
        }-${feature.geometry.type}-${JSON.stringify(feature.geometry)}`;

      const rawDate =
        readString(properties.objDate) ??
        readString(properties.date) ??
        readString(properties.buildDate) ??
        readString(properties.constructionDate) ??
        readString(properties.year) ??
        readNumber(properties.year);

      const shortDescription =
        readString(properties.shortDescription) ??
        readString(properties.short_description) ??
        readString(properties.description);

      const decision =
        readString(properties.lawReference) ??
        readString(properties.decision) ??
        readString(properties.decisionNumber) ??
        readString(properties.resolution);

      const location = resolveFeaturePoint(feature.geometry as GeoJSON.Geometry);

      return {
        id: rawId,
        name:
          typeof properties.name === "string" && properties.name.trim()
            ? properties.name
            : "Невідомий обʼєкт",
        displayStatus: resolveHeritageDisplayStatus(properties),
        statusLabel: resolveStatusLabel(properties),
        typeLabel: resolveTypeLabel(properties),
        date: rawDate,
        shortDescription,
        decision,
        location,
      };
    },
    [readNumber, readString, resolveFeaturePoint, resolveStatusLabel, resolveTypeLabel],
  );

  const routeWaypoints = useMemo(
    () => excursionItems.map((item) => item.location).filter(Boolean) as [number, number][],
    [excursionItems],
  );

  const buildRoute = useCallback(
    async (origin: [number, number]) => {
      if (!routeWaypoints.length) {
        setRouteError("Оберіть хоча б один обʼєкт для маршруту.");
        return;
      }
      setIsBuildingRoute(true);
      setRouteError(null);
      try {
        const coordinates = [origin, ...routeWaypoints]
          .map((coord) => `${coord[0]},${coord[1]}`)
          .join(";");
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/foot/${coordinates}?overview=full&geometries=geojson`,
        );
        if (!response.ok) {
          throw new Error("Не вдалося побудувати маршрут.");
        }
        const data = (await response.json()) as {
          routes?: Array<{ geometry?: GeoJSON.LineString }>;
        };
        const geometry = data.routes?.[0]?.geometry;
        if (!geometry) {
          throw new Error("Маршрут не знайдено.");
        }
        setRouteGeojson({
          type: "Feature",
          geometry,
          properties: {},
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Не вдалося побудувати маршрут.";
        setRouteError(message);
      } finally {
        setIsBuildingRoute(false);
      }
    },
    [routeWaypoints],
  );

  const isStartModalOpen = isSelectingStart && startMode === null;

  const handleStartPoint = useCallback(
    (lngLat: LngLatLike) => {
      const resolved = toLngLatTuple(lngLat);
      setIsSelectingStart(false);
      setStartMode(null);
      buildRoute(resolved);
    },
    [buildRoute],
  );

  const handleFeatureClick = useCallback(
    (feature: MapGeoJSONFeature, lngLat: LngLatLike) => {
      if (isSelectingStart && startMode === null) {
        return;
      }
      if (isSelectingStart && startMode === "manual") {
        handleStartPoint(lngLat);
        return;
      }
      const summary = buildFeatureSummary(feature);
      if (isExcursionActive) {
        setSelectedFeature(null);
        setSelectedLocation(null);
        setExcursionItems((prev) => {
          if (prev.some((item) => item.id === summary.id)) {
            return prev;
          }
          return [...prev, summary];
        });
        return;
      }
      setSelectedFeature(summary);
      setSelectedLocation(lngLat);
    },
    [isExcursionActive],
  );

  const handleEmptyClick = useCallback(
    (lngLat: LngLatLike) => {
      if (isSelectingStart && startMode === null) {
        return;
      }
      if (isSelectingStart && startMode === "manual") {
        handleStartPoint(lngLat);
        return;
      }
      if (!isExcursionActive) {
        setSelectedFeature(null);
        setSelectedLocation(null);
      }
    },
    [handleStartPoint, isExcursionActive, isSelectingStart, startMode],
  );

  const handleToggleExcursion = useCallback(() => {
    setIsExcursionActive((prev) => {
      const next = !prev;
      if (next) {
        setSelectedFeature(null);
        setSelectedLocation(null);
      }
      return next;
    });
  }, []);

  const handleRemoveItem = useCallback((id: string) => {
    setRouteGeojson(null);
    setExcursionItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleClearItems = useCallback(() => {
    setExcursionItems([]);
  setRouteGeojson(null);
  }, []);

  const handleBuildRouteRequest = useCallback(() => {
    if (!excursionItems.length) {
      return;
    }
    setIsSelectingStart(true);
    setStartMode(null);
    setRouteError(null);
  }, [excursionItems.length]);

  const handleSelectStartManual = useCallback(() => {
    setStartMode("manual");
    setRouteError(null);
  }, []);

  const handleSelectStartGeolocation = useCallback(() => {
    setStartMode("geolocation");
    setRouteError(null);
    if (!navigator.geolocation) {
      setIsBuildingRoute(false);
      setStartMode(null);
      setRouteError("Геолокація недоступна у цьому браузері.");
      return;
    }
    setIsBuildingRoute(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const origin: [number, number] = [
          position.coords.longitude,
          position.coords.latitude,
        ];
        setIsSelectingStart(false);
        setStartMode(null);
        buildRoute(origin);
      },
      () => {
        setIsBuildingRoute(false);
        setStartMode(null);
        setRouteError("Не вдалося отримати геолокацію.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, [buildRoute]);

  const handleCancelStartSelection = useCallback(() => {
    setIsSelectingStart(false);
    setStartMode(null);
  }, []);

  const closeSelectedFeature = useCallback(() => {
    setSelectedFeature(null);
    setSelectedLocation(null);
  }, []);

  useEffect(() => {
    if (routeGeojson && excursionItems.length === 0) {
      setRouteGeojson(null);
    }
  }, [excursionItems.length, routeGeojson]);

  useEffect(() => {
    setSelectedFeature(null);
    setSelectedLocation(null);
    setExcursionItems([]);
    setIsExcursionActive(false);
    setIsSelectingStart(false);
    setStartMode(null);
    setRouteGeojson(null);
    setIsBuildingRoute(false);
    setRouteError(null);
  }, [cityId]);

  return {
    selectedFeature,
    selectedLocation,
    excursionItems,
    isExcursionActive,
    isSelectingStart,
    isStartModalOpen,
    isBuildingRoute,
    routeError,
    routeGeojson,
    handleFeatureClick,
    handleEmptyClick,
    handleToggleExcursion,
    handleRemoveItem,
    handleClearItems,
    handleBuildRouteRequest,
    handleSelectStartManual,
    handleSelectStartGeolocation,
    handleCancelStartSelection,
    closeSelectedFeature,
  };
}
