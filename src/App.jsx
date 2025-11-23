import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense } from "react";

// Datos
import { publicLinks } from "./data/navbarPublicLinks";
import { adminLinks } from "./data/navbarAdminLinks";

// Componentes
import Navbar from "./components/organisms/Navbar"; // Guest
import NavbarAdmin from "./components/organisms/NavbarAdmin"; // Admin
import NavbarUsuario from "./components/organisms/NavbarUsuario"; // NUEVO: Usuario Logueado
import Footer from "./components/organisms/Footer";

import { appRoutes } from "./routes/config";
import { useAuth } from "./context/AuthContext";

function Layout() {
  const location = useLocation();
  const { user, loading } = useAuth(); 

  // Si está cargando la sesión, mostramos spinner para evitar parpadeos
  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  // LÓGICA DE ROLES
  const isAdmin = user?.rol?.id === 1;
  const isClient = user?.rol?.id === 2; // Asumiendo que 2 es el ID de usuario normal

  // Lógica de visibilidad (ocultar en login/registro)
  const hideNavbarRoutes = ['/login', '/create-user'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  // Decidir qué Navbar Renderizar
  let CurrentNavbar = null;
  
  if (showNavbar) {
      if (isAdmin) {
          CurrentNavbar = <NavbarAdmin links={adminLinks} />;
      } else if (isClient) {
          CurrentNavbar = <NavbarUsuario />; // Navbar de Cliente
      } else {
          CurrentNavbar = <Navbar links={publicLinks} />; // Navbar Invitado
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