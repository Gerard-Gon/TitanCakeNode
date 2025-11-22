// src/routes/adminLinks.js

export const adminLinks = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "Usuarios" },
  { to: "/admin/facciones", label: "Facciones" },
  // El link de "Salir" puede manejarse en el componente NavBar con un onClick
  { to: "/", label: "Salir" },
];

export default adminLinks;