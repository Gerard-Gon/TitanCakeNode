import { lazy } from 'react';

const Home = lazy(() => import('../pages/user/Home'));
const Products = lazy(() => import('../pages/user/Products'));
const Carrito = lazy(() => import('../pages/user/Carrito'));
const Contact = lazy(() => import('../pages/user/Contact'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const CreateUser = lazy(() => import('../pages/auth/create-user'));
const UserProfile = lazy(() => import('../pages/user/Perfil')); 
const ProductDetail = lazy(() => import('../pages/user/ProductsDetails')); 

const HomeAdmin = lazy(() => import('../pages/admin/HomeAdmin'));
const HomeProductos = lazy(() => import('../pages/admin/Productos/HomeProductos'));
const HomeUsuarios = lazy(() => import('../pages/admin/Usuarios/HomeUsuarios'));
const ProductForm = lazy(() => import('../pages/admin/Productos/ProductForm'));
const UserForm = lazy(() => import('../pages/admin/Usuarios/UsuarioForm'));


const publicRoutes = [
  { path: '/', element: <Home />, showNavbar: true },
  { path: '/home', element: <Home />, showNavbar: true },
  { path: '/login', element: <LoginPage />, showNavbar: true },
  { path: '/create-user', element: <CreateUser />, showNavbar: true},
  { path: '/products', element: <Products />, showNavbar: true},
  { path: '/carrito', element: <Carrito />, showNavbar: true},
  { path: '/contact', element: <Contact />, showNavbar: true},
  { path: '/profile', element: <UserProfile />, showNavbar: true },
  { path: '/products/:id', element: <ProductDetail />, showNavbar: true },
];


const adminRoutes = [
  { path: '/admin/HomeAdmin', element: <HomeAdmin />, isAdmin: true },
  { path: '/admin/productos', element: <HomeProductos />, isAdmin: true },
  { path: '/admin/productos/crear', element: <ProductForm />, isAdmin: true },
  { path: '/admin/productos/editar/:id', element: <ProductForm />, isAdmin: true },
  { path: '/admin/usuarios', element: <HomeUsuarios />, isAdmin: true },
  { path: '/admin/usuarios/crear', element: <UserForm />, isAdmin: true },
  { path: '/admin/usuarios/editar/:id', element: <UserForm />, isAdmin: true },
];


const notFoundRoute = {
  path: '*',
  element: <div className="text-center py-10 text-2xl">404 - Página no encontrada u.u</div>,
  showNavbar: false,
};

export const appRoutes = [...publicRoutes, ...adminRoutes, notFoundRoute];