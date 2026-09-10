import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import Footer from "../../components/Footer";

function MainLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      
      {/* STATIC HEADER */}
      <div className="shrink-0">
        <Header />
      </div>

      {/* SCROLLABLE CONTENT */}
      <main className="flex-1 min-h-0 overflow-y-auto">
        <Outlet />
      </main>

      {/* STATIC FOOTER */}
      <div className="shrink-0">
        <Footer />
      </div>

    </div>
  );
}

export { MainLayout };