import { useTranslation } from "react-i18next";
import { getHeritageStats } from "../../utils/getHeritageStats";
import { MapAnalyticsDashboardProps } from "../../props/MapAnalyticsDashboardProps";

export function MapAnalyticsDashboard({
  heritageData,
}: MapAnalyticsDashboardProps) {
  const { t } = useTranslation();

  const stats = getHeritageStats(heritageData);

return (
  <div className="absolute top-1 inset-x-0 z-20 flex justify-center pointer-events-none">

    <div
      className="
        w-fit
        rounded-[28px]
        border-2
        border-accent
        bg-white/95
        pointer-events-auto
        px-2
        py-2
      "
    >
      <div className="flex items-center gap-5">

    {/* ALL HERITAGE */}
    <div className="flex flex-col items-center">
        <div className="text-base md:text-lg font-semibold whitespace-nowrap">
        {t("mapDashboard.all")}
        </div>

        <div className="mt-0 text-2xl md:text-3xl font-semibold text-accent">
        {stats.total}
        </div>
    </div>

    {/* PROPOSED */}
    <div className="flex flex-col">
        <div className="text-base md:text-lg font-semibold whitespace-nowrap">
        {t("mapDashboard.proposed")}
        </div>

        <div className="mt-0 flex items-center gap-2">
        <span className="text-xs md:text-sm whitespace-nowrap">
            {t("mapDashboard.proposedHint")}
        </span>

        <span className="text-2xl md:text-3xl font-semibold text-accent">
            {stats.unprotected}
        </span>
        </div>
    </div>

    {/* CULTURAL HERITAGE */}
    <div className="flex flex-col">
        <div className="text-base md:text-lg font-semibold whitespace-nowrap">
        {t("mapDashboard.protected")}
        </div>

        <div className="mt-0 flex items-center gap-2">
        <span className="text-xs md:text-sm whitespace-nowrap">
            {t("mapDashboard.protectedHint")}
        </span>

        <span className="text-2xl md:text-3xl font-semibold text-accent">
            {stats.protected}
        </span>
        </div>
    </div>

    </div>
    </div>

  </div>
);
}