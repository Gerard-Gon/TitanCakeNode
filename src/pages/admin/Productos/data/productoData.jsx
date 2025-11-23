export const productData = [
    {
        type: "text",
        text: [
            { 
                id: 1, 
                content: "Gestión de Productos", 
                variant: "h1", 
                className: "text-center form-title mb-2" 
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
        columns: ["ID", "Imagen", "Nombre", "Precio", "Stock", "Acciones"],
        data: [], 
        service: "productos",
        className: "my-8 shadow-lg rounded-lg overflow-hidden", 
    },
];

export default productData;