import { useCallback, useEffect, useState } from "react";
import { LngLatLike, MapGeoJSONFeature } from "maplibre-gl";
import { CityId } from "../config/cities";
import { HeritageFeatureSummary } from "../types/heritageObj/HeritageFeatureSummary";
import { resolveHeritageDisplayStatus } from "./resolveHeritageDisplayStatus";

interface ExcursionControllerState {
  selectedFeature: HeritageFeatureSummary | null;
  selectedLocation: LngLatLike | null;
  excursionItems: HeritageFeatureSummary[];
  isExcursionActive: boolean;
  handleFeatureClick: (
    feature: MapGeoJSONFeature,
    lngLat: LngLatLike,
  ) => void;
  handleEmptyClick: () => void;
  handleToggleExcursion: () => void;
  handleRemoveItem: (id: string) => void;
  handleClearItems: () => void;
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

  const readString = (value: unknown) => {
    if (typeof value !== "string") {
      return null;
    }
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  };

  const readNumber = (value: unknown) => {
    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
    return null;
  };

  const resolveStatusLabel = (properties: Record<string, unknown>) => {
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
  };

  const resolveTypeLabel = (properties: Record<string, unknown>) => {
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
  };

  const buildFeatureSummary = (feature: MapGeoJSONFeature) => {
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
    };
  };

  const handleFeatureClick = useCallback(
    (feature: MapGeoJSONFeature, lngLat: LngLatLike) => {
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

  const handleEmptyClick = useCallback(() => {
    if (!isExcursionActive) {
      setSelectedFeature(null);
      setSelectedLocation(null);
    }
  }, [isExcursionActive]);

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
    setExcursionItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleClearItems = useCallback(() => {
    setExcursionItems([]);
  }, []);

  const closeSelectedFeature = useCallback(() => {
    setSelectedFeature(null);
    setSelectedLocation(null);
  }, []);

  useEffect(() => {
    setSelectedFeature(null);
    setSelectedLocation(null);
    setExcursionItems([]);
    setIsExcursionActive(false);
  }, [cityId]);

  return {
    selectedFeature,
    selectedLocation,
    excursionItems,
    isExcursionActive,
    handleFeatureClick,
    handleEmptyClick,
    handleToggleExcursion,
    handleRemoveItem,
    handleClearItems,
    closeSelectedFeature,
  };
}
