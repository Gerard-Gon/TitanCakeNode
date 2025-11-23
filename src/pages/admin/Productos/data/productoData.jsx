export const productData = [
    {
        type: "text",
        text: [
            { id: 1, content: "Inventario de Productos", variant: "h1", className: "text-4xl font-bold text-center" },
            { id: 2, content: "Gestiona el catálogo, precios y stock de TitanCake", variant: "p", className: "text-lg text-gray-600 text-center mt-2" },
        ],
    },
    {
        type: "table",
        title: "Listado de Pasteles",
        // Estas columnas definen el encabezado de la tabla.
        // IMPORTANTE: "Acciones" debe estar al final para que aparezcan los botones de editar/eliminar.
        columns: ["ID", "Imagen", "Nombre", "Descripción", "Precio", "Stock", "Acciones"],
        data: [], 
        service: "productos",
        className: "my-8",
    },
];

export default productData;