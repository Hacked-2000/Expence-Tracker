import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const isAppPage = location.pathname === '/' || location.pathname === '/expenses';

  useEffect(() => {
    if (isAppPage) {
      document.documentElement.classList.add('hide-scrollbar');
    } else {
      document.documentElement.classList.remove('hide-scrollbar');
    }
    return () => document.documentElement.classList.remove('hide-scrollbar');
  }, [isAppPage]);

  return (
    <div className="app-layout">
      <Navbar />
      <main className="page-container hide-scrollbar">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
