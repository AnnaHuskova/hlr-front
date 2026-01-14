import { HERITAGE_LEGEND } from "../../config/heritageLegendConfig";
import { LegendSymbol } from "./LegendSymbol";

export function HeritageLegend() {
  return (
    <div className="absolute bottom-6 left-6 bg-white/90 rounded-lg p-3 shadow-md text-sm">
      <div className="font-semibold mb-2">Легенда</div>

      <ul className="space-y-2">
        {HERITAGE_LEGEND.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            <LegendSymbol item={item} />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
