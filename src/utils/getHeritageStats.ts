import { HeritageFeatureCollection } from "../types/heritageObj/HeritageFeatureCollection";
import { resolveHeritageDisplayStatus } from "../controllers/resolveHeritageDisplayStatus";

export interface HeritageStats {
  total: number;
  protected: number;
  unprotected: number;
}

export function getHeritageStats(
  data: HeritageFeatureCollection
): HeritageStats {

  // Беремо тільки об'єкти, які мають HLR-статус.
  // Звичайна сучасна забудова в статистику не потрапляє.
  const relevantFeatures = data.features.filter(
    (feature) =>
      resolveHeritageDisplayStatus(feature.properties).group !== "modern"
  );

  const protectedObjects = relevantFeatures.filter(
    (feature) =>
      resolveHeritageDisplayStatus(feature.properties).group === "heritage"
  ).length;

  const unprotectedObjects = relevantFeatures.filter(
    (feature) =>
      resolveHeritageDisplayStatus(feature.properties).group === "proposed"
  ).length;

  return {
    total: relevantFeatures.length,
    protected: protectedObjects,
    unprotected: unprotectedObjects,
  };
}

export function getProjectStats(
  data: HeritageFeatureCollection
) {

  // Та сама логіка відбору для загальної статистики проєкту
  const relevantFeatures = data.features.filter(
    (feature) =>
      resolveHeritageDisplayStatus(feature.properties).group !== "modern"
  );

  const cityCounts = relevantFeatures.reduce<Record<string, number>>(
    (acc, feature) => {
      const cityId = feature.properties?.cityId;

      if (!cityId) return acc;

      acc[cityId] = (acc[cityId] || 0) + 1;

      return acc;
    },
    {}
  );

  return {
    cities: Object.keys(cityCounts).length,
    objects: relevantFeatures.length,

    cityCounts: {
      kryvyi_rih: cityCounts.kryvyi_rih || 0,
      kamyanske: cityCounts.kamyanske || 0,
    },
  };
}