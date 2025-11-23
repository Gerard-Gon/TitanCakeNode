// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense } from "react";

// Datos (Data-Driven UI)
import { publicLinks } from "./data/navbarPublicLinks";
import { adminLinks } from "./data/navbarAdminLinks";

// Componentes
import Navbar from "./components/organisms/Navbar";
import NavbarAdmin from "./components/organisms/NavbarAdmin";
import Footer from "./components/organisms/Footer";

import { appRoutes } from "./routes/config";
import { useAuth } from "./context/AuthContext";

function Layout() {
  const location = useLocation();
  const { user } = useAuth(); // Obtenemos usuario desde LocalStorage/Contexto

  // 1. Determinar Rol (Admin ID = 1)
  const isUserAdmin = user?.rol?.id === 1;

  // 2. Lógica de visibilidad del Navbar
  // Si es admin, siempre mostramos su barra. Si es usuario, ocultamos en login/registro.
  const hideNavbarRoutes = ['/login', '/create-user'];
  const shouldShowNavbar = isUserAdmin || !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Renderizado Condicional: 2 Navbars Diferentes */}
      {shouldShowNavbar && (
        isUserAdmin ? (
          // Pasamos los links de admin como prop (Modelo Naves)
          <NavbarAdmin links={adminLinks} />
        ) : (
          // Pasamos los links públicos como prop (Modelo Naves)
          <Navbar links={publicLinks} />
        )
      )}

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