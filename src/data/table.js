export const table = [
  {
    type: 'table',
    title: 'Lista de Usuarios', // Añadí un título de ejemplo
    columns: ['ID', 'nombre', 'correo', 'contrasena', 'rol'],
    data: [
      // Fila 1: ID, nombre, correo, contrasena, rol
      [1, 'Juan Pérez', 'juan.perez@ejemplo.com', 'juan123', ''],
      
      // Fila 2: ID, nombre, correo, contrasena, rol
      [2, 'María Gómez', 'maria.gomez@ejemplo.com', 'maria123', ''],
      
      // Fila 3: ID, nombre, correo, contrasena, rol
      [3, 'Carlos Rodríguez', 'carlos.r@ejemplo.com', 'carlos123', ''],
      
      // Fila 4: ID, nombre, correo, contrasena, rol
      [4, 'Ana Martínez', 'ana.m@ejemplo.com', 'ana123', ''],
    ],
    className: 'my-4 overflow-x-auto',
  }
];

export default table;