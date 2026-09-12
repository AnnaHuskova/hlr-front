import { HERITAGE_LEGEND } from "../../config/heritageLegendConfig";
import { LegendSymbol } from "./LegendSymbol";
import { useTranslation } from "react-i18next";

export function HeritageLegend() {
  const { t } = useTranslation();
  return (
    <div className="absolute bottom-6 right-6 bg-white/90 rounded-lg p-3 shadow-md text-sm">
      <div className="font-semibold mb-2">{t("legend.title")}</div>

      <ul className="space-y-2">
        {HERITAGE_LEGEND.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            <LegendSymbol item={item} />
            <span>{t(item.translationKey)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
