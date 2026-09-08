import { CityId, CITIES } from "../../config/cities";
import { useTranslation } from "react-i18next";

interface CitySwitcherProps {
  cityId: CityId;
  setCityId: (id: CityId) => void;
}

export function CitySwitcher({ cityId, setCityId }: CitySwitcherProps) {
  const { t } = useTranslation();

  return (
    <div className="absolute top-4 right-4 z-10 bg-white rounded-2xl shadow-md p-2 flex gap-2">
      {Object.entries(CITIES).map(([id]) => (
        <button
          key={id}
          onClick={() => setCityId(id as CityId)}
          className={`px-3 py-1 rounded-xl text-sm transition
            ${
              cityId === id
                ? "bg-accent text-white"
                : "bg-white text-black hover:bg-form-hover"
            }`}
        >
          {t(`city.${id}`)}
        </button>
      ))}
    </div>
  );
}
