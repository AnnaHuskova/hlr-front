import { HeritageProperties } from "../types/heritageObj/HeritageFeatureCollection";

export type HeritageDisplayGroup = "heritage" | "proposed" | "historical" | "modern";

export interface HeritageDisplayStatus {
  group: HeritageDisplayGroup;
  code: string;
  label: string;
}

const OBJ_TYPE_LABELS: Record<string, string> = {
  architecture: "архітектури",
  history: "історії",
  history_monumental: "історичної споруди",
  monument: "памʼятника",
  memorial: "меморіалу",
  monumental_art: "монументального мистецтва",
  archaeology: "археології",
  garden_park: "садово-паркового мистецтва",
  urban_planning: "містобудування",
  landscape: "ландшафту",
  local_architecture: "місцевої архітектури",
  local_sculpture: "сучасної скульптури",
  local_monument: "місцевого памʼятника",
  local_art: "муралу або інсталяції",
  local_place: "місця",
  local_element: "елемента",
  viewpoint: "оглядової точки",
};

const heritageLevelLabel = (level: HeritageProperties["heritageLevel"]) => {
  if (level === "national") return "національного значення";
  if (level === "local") return "місцевого значення";
  return "значення не визначено";
};

export const resolveHeritageDisplayStatus = (
  properties: Partial<HeritageProperties>,
): HeritageDisplayStatus => {
  const isHeritage = Boolean(properties.isHeritage);
  const isProposed = Boolean(properties.isProposed);
  const objTypeKey = properties.objType ?? "unknown";
  const objTypeLabel = OBJ_TYPE_LABELS[objTypeKey] ?? "обʼєкта";

  if (isHeritage) {
    const levelLabel = heritageLevelLabel(properties.heritageLevel ?? null);
    return {
      group: "heritage",
      code: `heritage_${objTypeKey}_${properties.heritageLevel ?? "unknown"}`,
      label: `Памʼятка ${objTypeLabel} ${levelLabel}`,
    };
  }

  if (isProposed) {
    const label =
      objTypeKey === "architecture"
        ? "Обʼєкт архітектури, що пропонується для взяття на держоблік"
        : "Обʼєкт, що пропонується для взяття на держоблік";
    return {
      group: "proposed",
      code: `proposed_${objTypeKey}_${properties.heritageLevel ?? "unknown"}`,
      label,
    };
  }

  if (properties.historicalValue) {
    const label =
      properties.historicalValue === "significant"
        ? "Значна історична будівля"
        : "Рядова історична будівля";
    return {
      group: "historical",
      code: `historical_${properties.historicalValue}`,
      label,
    };
  }

  return {
    group: "modern",
    code: "modern_building",
    label: "Сучасна забудова",
  };
};
