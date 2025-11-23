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
        columns: ["ID", "Nombre", "Correo", "Rol", "Acciones"], 
        data: [], 
        service: "usuarios", 
        className: "my-8 shadow-lg rounded-lg overflow-hidden",
    },
];