import { Outlet } from "react-router-dom";
import { HeritageLegend } from "../../components/Legend/HeritageLegend";

export function MapLayout() {
  return (
    <div className="relative w-full h-full">
      <Outlet />
      <HeritageLegend />
    </div>
  );
}
