import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importante para redirigir
import Section from '../../../components/templates/Section';
import Button from '../../../components/atoms/Button';
import productData from './data/productoData'; 
import ProductosService from '../../../services/ProductService'; 
import { generarMensaje } from '../../../utils/GenerarMensaje';

function HomeProductos() {
    const [pageData, setPageData] = useState(productData);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook para navegar

    const loadData = async () => {
        const updatedData = [...pageData];
        const tableItem = updatedData.find(i => i.service === "productos");

        if (tableItem) {
            try {
                setLoading(true);
                const response = await ProductosService.getAllProductos();
                const data = response.data;

                // Mapeamos los datos para la tabla
                // NOTA: Al no incluir botones de "Detalles" ni "Carrito", estos desaparecen automáticamente.
                const dataWithActions = data.map(prod => ({
                    id: prod.id,
                    imagen: prod.imageUrl,
                    nombre: prod.nombreProducto,
                    // descripcion: prod.descripcionProducto, (Opcional si la tabla se ve muy llena)
                    precio: `$${prod.precio}`,
                    stock: prod.stock,
                    
                    // ACCIÓN MODIFICAR: Redirige a la nueva página
                    onEdit: () => navigate(`/admin/productos/editar/${prod.id}`),
                    
                    // ACCIÓN ELIMINAR: Se mantiene directa aquí
                    onDelete: () => handleDelete(prod.id),
                }));

                tableItem.data = dataWithActions;
            } catch (error) {
                console.error(error);
                generarMensaje('No se pudieron cargar los productos', 'error');
                tableItem.data = [];
            } finally {
                setLoading(false);
            }
        }
        setPageData(updatedData);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este producto permanentemente?')) return;

        try {
            await ProductosService.deleteProducto(id);
            generarMensaje('¡Producto eliminado con éxito!', 'success');
            loadData(); // Recargamos la lista
        } catch (error) {
            console.error(error);
            generarMensaje('Error al eliminar. Verifica si está en algún carrito.', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {loading && (
                <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                </div>
            )}

            {/* Botón SUPERIOR para Crear Producto */}
            <div className="container mx-auto py-8 px-4 flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800 font-['Cream_Cake']">Gestión de Productos</h2>
                <Button
                    text="+ Crear Nuevo Producto"
                    onClick={() => navigate('/admin/productos/crear')} // Redirige a la página de creación
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md font-bold transition-transform transform hover:scale-105"
                />
            </div>

            {/* Tabla de Productos */}
            <Section content={pageData} className="container mx-auto px-4 pb-10" />
        </div>
    );
}

export default HomeProductos;