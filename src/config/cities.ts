export type CityId = "kamyanske" | "kryvyi_rih";

export const CITIES: Record<
  CityId,
  {
    label: string;
    center: [number, number];
    zoom: number;
    bounds: [[number, number], [number, number]];
  }
> = {
  kamyanske: {
    label: "Кам’янське",
    center: [34.615, 48.516],
    zoom: 11,
    bounds: [
      [34.45, 48.40],
      [34.80, 48.65],
    ],
  },
  kryvyi_rih: {
    label: "Кривий Ріг",
    center: [33.35, 47.91],
    zoom: 11,
    bounds: [
      [33.00, 47.70],
      [33.80, 48.15],
    ],
  },
};
