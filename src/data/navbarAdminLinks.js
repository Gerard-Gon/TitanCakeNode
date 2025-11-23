// src/routes/adminLinks.js

export const adminLinks = [
  { to: "/admin/HomeAdmin", label: "Dashboard" },
  { to: "/admin/users", label: "Usuarios" },
  { to: "/admin/productos", label: "Productos" },
  
  // El link de "Salir" puede manejarse en el componente NavBar con un onClick
  { to: "/", label: "Salir" },
];

export default adminLinks;