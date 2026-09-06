import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Map as MapInstance } from "maplibre-gl";
import { Map } from "../../components/Map";
import { CityId } from "../../config/cities";
import { HeritageFeatureCollection } from "../../types/heritageObj/HeritageFeatureCollection";
import { CitySwitcher } from "../../components/CitySwitcher/CitySwitcher";
import { FeaturePopup } from "../../components/FeaturePopup/FeaturePopup";
import { ExcursionPanel } from "../../components/ExcursionPanel/ExcursionPanel";
import { StartRouteModal } from "../../components/StartRouteModal";
import { useExcursionController } from "../../controllers/useExcursionController";

interface HomePageProps {
  cityId: CityId;
  setCityId: Dispatch<SetStateAction<CityId>>;
  heritageData: HeritageFeatureCollection;
}

const HomePage = ({ cityId, setCityId, heritageData }: HomePageProps) => {
  const [mapInstance, setMapInstance] = useState<MapInstance | null>(null);
  const {
    selectedFeature,
    selectedLocation,
    excursionItems,
    isExcursionActive,
    isStartModalOpen,
    isBuildingRoute,
    routeError,
    routeGeojson,
    handleFeatureClick,
    handleEmptyClick,
    handleToggleExcursion,
    handleRemoveItem,
    handleClearItems,
    closeSelectedFeature,
    handleBuildRouteRequest,
    handleSelectStartManual,
    handleSelectStartGeolocation,
    handleCancelStartSelection,
  } = useExcursionController(cityId);

  return (
      <div className="relative w-full h-full">
        <CitySwitcher cityId={cityId} setCityId={setCityId} />
        <Map
          cityId={cityId}
          heritageData={heritageData}
          onFeatureClick={handleFeatureClick}
          onEmptyClick={handleEmptyClick}
          onMapReady={setMapInstance}
          routeGeojson={routeGeojson}
        />
        {selectedFeature ? (
          <FeaturePopup
            feature={selectedFeature}
            onClose={closeSelectedFeature}
            map={mapInstance}
            coordinates={selectedLocation}
          />
        ) : null}
        <ExcursionPanel
          isActive={isExcursionActive}
          items={excursionItems}
          isBuildingRoute={isBuildingRoute}
          routeError={routeError}
          onToggleActive={handleToggleExcursion}
          onRemoveItem={handleRemoveItem}
          onClearItems={handleClearItems}
          onBuildRouteRequest={handleBuildRouteRequest}
        />
        <StartRouteModal
          isOpen={isStartModalOpen}
          isBuildingRoute={isBuildingRoute}
          onSelectManual={handleSelectStartManual}
          onSelectGeolocation={handleSelectStartGeolocation}
          onClose={handleCancelStartSelection}
        />
      </div>
    );
};

export default HomePage;