import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header';
import Footer from '../../components/Footer';

function MainLayout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="map-wrapper">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export { MainLayout };