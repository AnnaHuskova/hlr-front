import { CityId, CITIES } from "../../config/cities";

interface CitySwitcherProps {
  cityId: CityId;
  setCityId: (id: CityId) => void;
}

export function CitySwitcher({ cityId, setCityId }: CitySwitcherProps) {
  return (
    <div className="absolute top-4 right-4 z-10 bg-white rounded-2xl shadow-md p-2 flex gap-2">
      {Object.entries(CITIES).map(([id, city]) => (
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
          {city.label}
        </button>
      ))}
    </div>
  );
}
