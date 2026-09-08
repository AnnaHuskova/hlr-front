import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import maplibregl, { LngLatLike, Map } from "maplibre-gl";
import type { HeritageFeatureSummary } from "../../types/heritageObj/HeritageFeatureSummary";
import { useTranslation } from "react-i18next";
interface FeaturePopupProps {
  feature: HeritageFeatureSummary;
  onClose: () => void;
  map: Map | null;
  coordinates: LngLatLike | null;
}

export function FeaturePopup({
  feature,
  onClose,
  map,
  coordinates,
}: FeaturePopupProps) {
  const { t } = useTranslation();
  const container = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    if (!map || !coordinates) {
      return undefined;
    }

    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 12,
      className: "heritage-popup",
    })
      .setLngLat(coordinates)
      .setDOMContent(container)
      .addTo(map);

    return () => {
      popup.remove();
    };
  }, [container, coordinates, map]);

  if (!map || !coordinates) {
    return null;
  }

  return createPortal(
    <div className="w-80 rounded-2xl bg-white shadow-md p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold leading-snug text-black">
          {feature.name}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-black/60 hover:text-black"
          aria-label={t("popup.close")}
        >
          ✕
        </button>
      </div>
      <div className="text-sm text-black/70 space-y-2">
        <p>
          <span className="font-medium text-black">{t("popup.status")}:</span>{" "}
          {feature.displayStatus.label}
        </p>
        <p>
          <span className="font-medium text-black">{t("popup.type")}:</span>{" "}
          {feature.typeLabel}
        </p>
        <p>
          <span className="font-medium text-black">{t("popup.date")}:</span>{" "}
          {feature.date ?? "—"}
        </p>
        <p>
          <span className="font-medium text-black">{t("popup.shortDescription")}:</span>{" "}
          {feature.shortDescription ?? "—"}
        </p>
        <p>
          <span className="font-medium text-black">{t("popup.decision")}:</span>{" "}
          {feature.decision ?? "—"}
        </p>
      </div>
    </div>,
    container,
  );
}
