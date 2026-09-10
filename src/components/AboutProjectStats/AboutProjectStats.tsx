import { useTranslation } from "react-i18next";
import { getProjectStats } from "../../utils/getHeritageStats";
import { AboutProjectStatsProps } from "../../props/AboutProjectStatsProps";

export function AboutProjectStats({
  heritageData,
}: AboutProjectStatsProps) {
  const { t } = useTranslation();

  const projectStats = heritageData
    ? getProjectStats(heritageData)
    : {
        cities: 0,
        objects: 0,
        cityCounts: {
          kryvyi_rih: 0,
          kamyanske: 0,
        },
      };

  return (
    <section
      id="development"
      className="mt-10 scroll-mt-24"
    >
      <h2 className="mb-2 text-lg">
        {t("aboutPage.development.title")}
      </h2>

      <div className="border-t border-black/30 pt-5">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4">

          {/* PILOT CITIES */}
          <div
            className="
              min-h-[230px]
              px-8
              py-6
              flex
              flex-col
              items-center
              border
              border-dashed
              border-accent
            "
          >
            <h3 className="text-xl font-semibold text-center">
              {t("aboutPage.stats.cities")}
            </h3>

            <div className="mt-5 text-3xl font-semibold text-accent">
              {projectStats.cities}
            </div>

            <div className="mt-8 w-full space-y-5 text-lg text-center">
              <div>
                {t("aboutPage.stats.kryvyiRih")}
              </div>

              <div>
                {t("aboutPage.stats.kamianske")}
              </div>
            </div>
          </div>


          {/* MAPPED OBJECTS */}
          <div
            className="
              min-h-[230px]
              px-8
              py-6
              flex
              flex-col
              items-center
              border
              border-dashed
              border-accent
            "
          >
            <h3 className="text-xl font-semibold text-center">
              {t("aboutPage.stats.objects")}
            </h3>

            <div className="mt-5 text-3xl font-semibold text-accent">
              {projectStats.objects}
            </div>

            <div className="mt-8 w-full space-y-5 text-lg">

              <div className="flex justify-between">
                <span>
                  {t("aboutPage.stats.kryvyiRih")}
                </span>

                <span className="font-semibold text-accent">
                  {projectStats.cityCounts.kryvyi_rih}
                </span>
              </div>

              <div className="flex justify-between">
                <span>
                  {t("aboutPage.stats.kamianske")}
                </span>

                <span className="font-semibold text-accent">
                  {projectStats.cityCounts.kamyanske}
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}