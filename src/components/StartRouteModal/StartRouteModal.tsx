import { useTranslation } from "react-i18next";

interface StartRouteModalProps {
  isOpen: boolean;
  isBuildingRoute: boolean;
  onSelectManual: () => void;
  onSelectGeolocation: () => void;
  onClose: () => void;
}

export function StartRouteModal({
  isOpen,
  isBuildingRoute,
  onSelectManual,
  onSelectGeolocation,
  onClose,
}: StartRouteModalProps) {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10">
      <div className="w-[520px] max-w-[90vw] rounded-[32px] border border-accent/40 bg-white px-8 py-6 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-black">
            {t("startRouteModal.title")}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-black/50 hover:text-black"
            aria-label="Закрити"
          >
            ✕
          </button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6 text-base text-black">
          <button
            type="button"
            onClick={onSelectManual}
            disabled={isBuildingRoute}
            className="rounded-3xl border border-accent/30 px-4 py-4 text-left hover:border-accent/60 hover:bg-accent/5 disabled:opacity-60"
          >
            📍 {t("startRouteModal.manual")}
            <span className="mt-2 block text-sm text-black/60">
              {t("startRouteModal.manualHint")}
            </span>
          </button>
          <button
            type="button"
            onClick={onSelectGeolocation}
            disabled={isBuildingRoute}
            className="rounded-3xl border border-accent/30 px-4 py-4 text-left hover:border-accent/60 hover:bg-accent/5 disabled:opacity-60"
          >
            {t("startRouteModal.geolocation")}
          </button>
        </div>
      </div>
    </div>
  );
}
