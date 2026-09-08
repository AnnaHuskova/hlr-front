import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import envVars from "./js/env";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import { MapLayout } from "./layouts/MapLayout/MapLayout";
import HomePage from "./pages/HomePage";
import { CityId } from "./config/cities";
import { HeritageFeatureCollection } from "./types/heritageObj/HeritageFeatureCollection";
import {AboutPage} from "./pages/AboutPage";

const BACKEND_URL = envVars.REACT_APP_BACKEND_URL!;
const HERITAGE_ENDPOINT = envVars.REACT_APP_HERITAGE_ENDPOINT!;

function App() {
  const [cityId, setCityId] = useState<CityId>("kamyanske");
  const [heritageData, setHeritageData] =
    useState<HeritageFeatureCollection | null>(null);

  useEffect(() => {
    const fetchHeritage = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}${HERITAGE_ENDPOINT}?cityId=${cityId}`
        );
        const geojson = await res.json();
        setHeritageData(geojson);
      } catch (e) {
        console.error("Failed to load heritage data", e);
      }
    };

    fetchHeritage();
  }, [cityId]);

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<MapLayout />}>
            <Route
              path="/"
              element={
                heritageData ? (
                  <HomePage
                    cityId={cityId}
                    setCityId={setCityId}
                    heritageData={heritageData}
                  />
                ) : null
              }
            />
          </Route>
          <Route path="/about" element={<AboutPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </>
  );

}

export default App;
