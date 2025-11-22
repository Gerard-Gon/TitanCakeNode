
// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense } from "react";

// Links para el navbar (públicos y admin)
import { publicLinks } from "./data/navbarPublicLinks";
import { adminLinks } from "./data/navbarAdminLinks";

// Componentes comunes
import Navbar from "./components/organisms/Navbar";
import Footer from "./components/organisms/Footer";

// Configuración centralizada de rutas
import { appRoutes } from "./routes/config";

/**
 * Layout principal de la aplicación.
 * - Determina si se debe mostrar el Navbar según la ruta actual.
 * - Carga dinámicamente las rutas definidas en `appRoutes`.
 * - Muestra un loader mientras se cargan las páginas (Suspense).
 */
function Layout() {
  const location = useLocation();

  // Detecta si la ruta actual es de administración
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Busca la ruta actual en la configuración
  const currentRoute = appRoutes.find((route) => route.path === location.pathname);

  // Decide si mostrar el Navbar
  const showNavbar = isAdminRoute || currentRoute?.showNavbar;

  // Configura los links y título del Navbar según el tipo de ruta
  const navbarLinks = isAdminRoute ? adminLinks : publicLinks;
  const navbarTitle = isAdminRoute ? "Admin TitanCake" : "TitanCake";

  return (
    <>
      {/* Navbar dinámico */}
      {showNavbar && <Navbar links={navbarLinks} title={navbarTitle} />}

      {/* Contenido principal con Suspense */}
      <main>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
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

      {/* Footer fijo */}
      <Footer />
    </>
  );
}

/**
 * Componente raíz de la aplicación.
 * Renderiza el Layout principal.
 */
function App() {
  return <Layout />;
}

export default App;
