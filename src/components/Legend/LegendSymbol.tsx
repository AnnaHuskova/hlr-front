import { HeritageLegendItem } from "../../types/MapElements/HeritageLegend";

export function LegendSymbol({ item }: { item: HeritageLegendItem }) {
  if (item.geometry === "outline-only") {
    return (
      <span
        className="inline-block w-4 h-4 border-2"
        style={{ borderColor: item.color }}
      />
    );
  }

  return (
    <span
      className="inline-block w-4 h-4 rounded-sm"
      style={{ backgroundColor: item.color }}
    />
  );
}
