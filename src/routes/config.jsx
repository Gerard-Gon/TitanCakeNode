import { lazy } from 'react';

// Lazy loading hace que cargue las páginas solo cuando se necesitan
const Home = lazy(() => import('../pages/user/Home'));
const Products = lazy(() => import('../pages/user/Products'));
const Carrito = lazy(() => import('../pages/user/Carrito'));
const Contact = lazy(() => import('../pages/user/Contact'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const CreateUser = lazy(() => import('../pages/auth/create-user'));
const HomeAdmin = lazy(() => import('../pages/admin/HomeAdmin'));

const HomeProductos = lazy(() => import('../pages/admin/Productos/HomeProductos'));
const HomeUsuarios = lazy(() => import('../pages/admin/Usuarios/HomeUsuarios'));
const ProductForm = lazy(() => import('../pages/admin/Productos/ProductForm'));
const UserForm = lazy(() => import('../pages/admin/Usuarios/UsuarioForm'));

// Rutas públicas o del usuario, así están mejor organizadas
const publicRoutes = [
  { path: '/', element: <Home />, showNavbar: true },
  { path: '/home', element: <Home />, showNavbar: true },
  { path: '/login', element: <LoginPage />, showNavbar: true },
  { path: '/create-user', element: <CreateUser />, showNavbar: true},
  { path: '/products', element: <Products />, showNavbar: true},
  { path: '/carrito', element: <Carrito />, showNavbar: true},
  { path: '/contacto', element: <Contact />, showNavbar: true},
];

// Rutas del administrador 
const adminRoutes = [
  { path: '/admin/HomeAdmin', element: <HomeAdmin />, isAdmin: true },
  { path: '/admin/productos', element: <HomeProductos />, isAdmin: true },
  { path: '/admin/productos/crear', element: <ProductForm />, isAdmin: true },
  { path: '/admin/productos/editar/:id', element: <ProductForm />, isAdmin: true },
  { path: '/admin/usuarios', element: <HomeUsuarios />, isAdmin: true },
  { path: '/admin/usuarios/crear', element: <UserForm />, isAdmin: true },
  { path: '/admin/usuarios/editar/:id', element: <UserForm />, isAdmin: true },
];

// Ruta 404 por ahora no hice una página específica, solo un div simple (por ahora (puede cambiar (o eso creo)))
const notFoundRoute = {
  path: '*',
  element: <div className="text-center py-10 text-2xl">404 - Página no encontrada u.u</div>,
  showNavbar: false,
};

// Exportar todas las rutas en un solo arreglo, hell yeah
export const appRoutes = [...publicRoutes, ...adminRoutes, notFoundRoute];