// src/pages/admin/Productos/data/productoData.jsx
export const productData = [
    {
        type: "text",
        text: [
            { 
                id: 1, 
                content: "Gestión de Productos", 
                variant: "h1", 
                className: "text-center form-title mb-2" // Clase de tu CSS global
            },
            { 
                id: 2, 
                content: "Administra el catálogo de pasteles de TitanCake", 
                variant: "p", 
                className: "text-center text-muted mb-4" 
            },
        ],
    },
    {
        type: "table",
        title: "Inventario Actual",
        // DynamicTable buscará estas keys en los datos mapeados
        columns: ["ID", "Imagen", "Nombre", "Precio", "Stock", "Acciones"],
        data: [], 
        service: "productos",
        className: "my-8 shadow-lg rounded-lg overflow-hidden", // Estilos Tailwind/Bootstrap híbridos
    },
];

export default productData;