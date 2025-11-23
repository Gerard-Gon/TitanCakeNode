// src/pages/user/data/usuarioData.jsx

export const usuarioData = [
    {
        type: "text",
        text: [
            { 
                id: 1, 
                content: "Gestión de Usuarios", 
                variant: "h1", 
                className: "text-center form-title mb-2" 
            },
            { 
                id: 2, 
                content: "Administra los usuarios registrados en TitanCake", 
                variant: "p", 
                className: "text-center text-muted mb-4" 
            },
        ],
    },
    {
        type: "table",
        title: "Lista de Usuarios",
        // Estas columnas deben coincidir con las que mapeas en HomeUsuarios
        columns: ["ID", "Nombre", "Correo", "Rol", "Acciones"], 
        data: [], 
        // Este 'service' es clave: HomeUsuarios busca este string para inyectar los datos
        service: "usuarios", 
        className: "my-8 shadow-lg rounded-lg overflow-hidden",
    },
];