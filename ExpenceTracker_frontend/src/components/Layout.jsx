import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';

const Layout = ({ mode, toggleTheme }) => {
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
    <>
      <Navbar mode={mode} toggleTheme={toggleTheme} />
      <main className="page-container hide-scrollbar">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
