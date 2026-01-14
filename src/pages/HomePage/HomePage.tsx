import { Map } from "../../components/Map";
import { CityId } from "../../config/cities";
import { HeritageFeatureCollection } from "../../types/heritageObj/HeritageFeatureCollection";
import { CitySwitcher } from "../../components/CitySwitcher/CitySwitcher";

interface HomePageProps {
  cityId: CityId;
  setCityId: React.Dispatch<React.SetStateAction<CityId>>;
  heritageData: HeritageFeatureCollection;
}

const HomePage = ({ cityId, setCityId, heritageData }: HomePageProps) => {
  return (
      <div className="relative w-full h-full">
        <CitySwitcher cityId={cityId} setCityId={setCityId} />
        <Map cityId={cityId} heritageData={heritageData} />
      </div>
    );
};

export default HomePage;