// src/routes/adminLinks.js

export const adminLinks = [
  { to: "/admin/usuarios", label: "Usuarios" },
  { to: "/admin/productos", label: "Productos" },
  
  // El link de "Salir" puede manejarse en el componente NavBar con un onClick
  { to: "/", label: "Salir" },
];

export default adminLinks;