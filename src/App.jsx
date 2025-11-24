import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense } from "react";

// Datos
import { publicLinks } from "./data/navbarPublicLinks";
import { adminLinks } from "./data/navbarAdminLinks";

// Componentes
import Navbar from "./components/organisms/Navbar"; 
import NavbarAdmin from "./components/organisms/NavbarAdmin"; 
import NavbarUsuario from "./components/organisms/NavBarUsuario"; 
import Footer from "./components/organisms/Footer";

import { appRoutes } from "./routes/config";
import { useAuth } from "./context/AuthContext";

function Layout() {
  const location = useLocation();
  const { user, loading } = useAuth(); 

  
  if (loading) return <div className="text-center mt-5">Cargando...</div>;

 
  const isAdmin = user?.rol?.id === 1;
  const isClient = user?.rol?.id === 2; 

  
  const hideNavbarRoutes = ['/login', '/create-user'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  
  let CurrentNavbar = null;
  
  if (showNavbar) {
      if (isAdmin) {
          CurrentNavbar = <NavbarAdmin links={adminLinks} />;
      } else if (isClient) {
          CurrentNavbar = <NavbarUsuario />; 
      } else {
          CurrentNavbar = <Navbar links={publicLinks} />; 
      }
  }

  return (
    <>
      {CurrentNavbar}

      <main className="flex-grow-1">
        <Suspense
          fallback={
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
               <div className="spinner-border text-primary" role="status"></div>
            </div>
          }
        >
          <Routes>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

function App() {
  return <Layout />;
}

export default App;