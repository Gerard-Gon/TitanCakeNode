// src/data/homeData.js
export const productData = [
    {
        type: "text",
        text: [
            { id: 1, content: "Bienvenido a la edición de Productos", variant: "h1", className: "text-4xl font-bold text-center" },
            { id: 2, content: "aquí podrás editar los productos de una galaxia muy muy lejana ", variant: "p", className: "text-lg text-gray-600 text-center mt-2" },
        ],
    },
    {
        type: "table",
        title: "Productos Activos",
        columns: ["ID", "Nombre", "descripcion", "Stock", "Precio"],
        data: [], 
        service: "productos",
        className: "my-8",
    },
];

export default productData;