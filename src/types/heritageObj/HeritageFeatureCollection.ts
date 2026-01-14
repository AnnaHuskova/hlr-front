import { Geometry } from "geojson";
import { HeritageObjType } from "./HeritageObjType";

export interface HeritageProperties {
  name: string | null;
  historicalValue: "significant" | "ordinary" | null;
  heritageLevel: "national" | "local" | null;
  isProposed: boolean | null;
  isHeritage: boolean | null;
  objType: HeritageObjType | null;
  cityId: "kamyanske" | "kryvyi_rih";
}

export interface HeritageFeature {
  _id: string;
  type: "Feature";
  properties: HeritageProperties;
  geometry: Geometry;
}

export interface HeritageFeatureCollection {
  type: "FeatureCollection";
  features: HeritageFeature[];
}
