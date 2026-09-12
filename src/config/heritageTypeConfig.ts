import { HeritageObjType } from "../types/heritageObj/HeritageObjType";

export const HERITAGE_TYPE_GROUPS = [
  {
    id: "architecture",
    translationKey: "heritageType.architecture",
    objTypes: [
      "architecture",
      "urban_planning",
      "garden_park",
      "landscape",
      "local_place",
      "local_element",
      "viewpoint",
    ] as HeritageObjType[],
  },
  {
    id: "archaeology",
    translationKey: "heritageType.archaeology",
    objTypes: [
      "archaeology",
    ] as HeritageObjType[],
  },
  {
    id: "monumental_art",
    translationKey: "heritageType.monumentalArt",
    objTypes: [
      "history",
      "history_monumental",
      "monument",
      "memorial",
      "local_monument",
      "local_sculpture",
      "local_art",
    ] as HeritageObjType[],
  },
] as const;

export type HeritageTypeGroupId =
  (typeof HERITAGE_TYPE_GROUPS)[number]["id"];

export function resolveHeritageTypeGroup(
  objType: HeritageObjType | null,
): HeritageTypeGroupId | null {
  if (!objType) return null;

  const group = HERITAGE_TYPE_GROUPS.find(
    (item) =>
      (item.objTypes as readonly HeritageObjType[]).includes(objType),
  );

  return group?.id ?? null;
}