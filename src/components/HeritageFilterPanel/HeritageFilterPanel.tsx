import { useState } from "react";
import { useTranslation } from "react-i18next";

import { HERITAGE_LEGEND } from "../../config/heritageLegendConfig";

import {
  HERITAGE_TYPE_GROUPS,
  HeritageTypeGroupId,
  resolveHeritageTypeGroup,
} from "../../config/heritageTypeConfig";

import { HeritageFeatureCollection } from "../../types/heritageObj/HeritageFeatureCollection";
import { HeritageFilters } from "../../types/heritageObj/HeritageFilters";

import {
  HeritageLegendId,
  resolveHeritageLegendGroup,
} from "../../utils/resolveHeritageLegendGroup";

import { FilterToggle } from "./FilterToggle";
import panelOpenIcon from "../../assets/isons/logo_panel_open.svg";
import panelCloseIcon from "../../assets/isons/logo_panel_close.svg";

interface HeritageFilterPanelProps {
  data: HeritageFeatureCollection;
  filters: HeritageFilters;
  onChange: (filters: HeritageFilters) => void;
}

export function HeritageFilterPanel({
  data,
  filters,
  onChange,
}: HeritageFilterPanelProps) {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleStatus = (id: HeritageLegendId) => {
    onChange({
      ...filters,
      statuses: {
        ...filters.statuses,
        [id]: !filters.statuses[id],
      },
    });
  };

  const toggleType = (id: HeritageTypeGroupId) => {
    onChange({
      ...filters,
      types: {
        ...filters.types,
        [id]: !filters.types[id],
      },
    });
  };

  const getStatusCount = (id: HeritageLegendId) => {
  const legendItem = HERITAGE_LEGEND.find(
        (item) => item.id === id,
    );

    if (!legendItem) {
        return 0;
    }

    return data.features.filter(
        (feature) =>
        legendItem.matches(feature.properties),
    ).length;
    };

  const getTypeCount = (id: HeritageTypeGroupId) =>
    data.features.filter(
      (feature) =>
        resolveHeritageTypeGroup(feature.properties.objType) === id,
    ).length;

    const totalHeritageCount = data.features.filter(
    (feature) =>
        HERITAGE_LEGEND.some(
        (item) =>
            item.matches(feature.properties),
        ),
    ).length;

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="
          absolute
          left-5
          top-40
          z-30

          flex
          h-16
          w-16
          items-center
          justify-center

          rounded-full
          bg-white
          text-accent

          shadow-[0_8px_15px_rgba(0,0,0,0.30)]

          transition-transform
          hover:scale-105
        "
      >
        <img
        src={panelCloseIcon}
        alt=""
        className="h-full w-full p-3"
        />
      </button>
    );
  }

  return (
    <aside
      className="
        absolute
        left-0
        top-32
        z-30

        flex
        w-[335px]
        max-h-[calc(100vh-12rem-72px)]
        flex-col

        overflow-hidden

        rounded-r-[14px]
        border-2
        border-accent
        bg-white
      "
    >
      {/* HEADER — fixed */}

      <div
        className="
          shrink-0
          px-5
          pt-4
          pb-3
        "
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
            src={panelOpenIcon}
            alt=""
            className="h-8 w-8 shrink-0"
            />

            <div className="flex items-baseline gap-2 text-lg font-semibold">
              <span>
                {t("filters.all")}
              </span>

              <span className="text-accent">
                {totalHeritageCount}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="
              -mt-1
              text-[42px]
              font-light
              leading-none
              text-accent
            "
          >
            ‹
          </button>
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}

      <div
        className="
          heritage-filter-scroll

          min-h-0
          flex-1
          overflow-y-auto

          px-5
          pb-4
        "
      >
        {/* STATUS */}

        <section>
          <h3 className="mb-3 text-[17px] font-semibold">
            {t("filters.byStatus")}
          </h3>

          {HERITAGE_LEGEND.map((item) => {
            const count =
              getStatusCount(item.id);

            if (count === 0) {
              return null;
            }

            return (
              <FilterRow
                key={item.id}
                label={t(item.translationKey)}
                count={count}
                checked={filters.statuses[item.id]}
                onChange={() =>
                  toggleStatus(item.id)
                }
              />
            );
          })}
        </section>

        <PanelDivider />

        {/* TYPE */}

        <section>
          <h3 className="mb-3 text-[17px] font-semibold">
            {t("filters.byType")}
          </h3>

          {HERITAGE_TYPE_GROUPS.map((item) => {
            const count =
              getTypeCount(item.id);

            if (count === 0) {
              return null;
            }

            return (
              <FilterRow
                key={item.id}
                label={t(item.translationKey)}
                count={count}
                checked={filters.types[item.id]}
                onChange={() =>
                  toggleType(item.id)
                }
              />
            );
          })}
        </section>

        <PanelDivider />

        {/* ANALYTICS */}

        <section>
          <h3 className="mb-4 text-[17px] font-semibold">
            {t("filters.analytics")}
          </h3>

          <div className="grid grid-cols-2 gap-5">
            <AnalyticsPlaceholder
              label={t(
                "filters.analyticsByStatus",
              )}
            />

            <AnalyticsPlaceholder
              label={t(
                "filters.analyticsByType",
              )}
            />
          </div>
        </section>
      </div>
    </aside>
  );
}

interface FilterRowProps {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}

function FilterRow({
  label,
  count,
  checked,
  onChange,
}: FilterRowProps) {
  return (
    <div
      className="
        mb-3
        grid
        grid-cols-[34px_1fr_auto]
        items-start
        gap-2
      "
    >
      <div className="pt-[1px]">
        <FilterToggle
          checked={checked}
          onChange={onChange}
        />
      </div>

      <button
        type="button"
        onClick={onChange}
        className="
          text-left
          text-[13px]
          leading-[1.25]
        "
      >
        {label}
      </button>

      <span
        className="
          pl-2
          text-[16px]
          font-semibold
          leading-[1.2]
          text-accent
        "
      >
        {count}
      </span>
    </div>
  );
}

function PanelDivider() {
  return (
    <div
      className="
        mx-5
        my-4
        border-t
        border-accent
      "
    />
  );
}

interface AnalyticsPlaceholderProps {
  label: string;
}

function AnalyticsPlaceholder({
  label,
}: AnalyticsPlaceholderProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="
          mb-2
          max-w-[90px]
          text-center
          text-xs
          leading-tight
        "
      >
        {label}
      </div>

      <div
        className="
          h-[105px]
          w-[105px]
          rounded-full
          bg-gray-300
        "
      />
    </div>
  );
}