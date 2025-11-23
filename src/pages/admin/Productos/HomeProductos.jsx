// src/pages/admin/Productos/HomeProductos.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap'; // Respetamos imports de Bootstrap
import Section from '../../../components/templates/Section';
import Button from '../../../components/atoms/Button';
import { generarMensaje } from '../../../utils/GenerarMensaje';
import ProductosService from '../../../services/ProductService';
import productData from './data/productoData';

function HomeProductos() {
    const [pageData, setPageData] = useState(productData);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadData = async () => {
        // Clonamos la estructura para modificarla
        const updatedData = JSON.parse(JSON.stringify(productData));
        const tableItem = updatedData.find(i => i.type === "table");

        try {
            setLoading(true);
            const response = await ProductosService.getAllProductos();
            const productosBackend = response.data; // Array de tu modelo Java Producto

            // Mapeo de Datos: Backend Java -> Frontend Table
            const dataWithActions = productosBackend.map(prod => ({
                // Keys deben coincidir (en minúsculas) con las columnas de productData
                id: prod.id,
                nombre: prod.nombreProducto, // Tu modelo usa 'nombreProducto'
                precio: `$${prod.precio.toLocaleString('es-CL')}`,
                stock: prod.stock,
                
                // Inyección de funciones para DynamicTable
                onEdit: () => navigate(`/admin/productos/editar/${prod.id}`),
                onDelete: () => handleDelete(prod.id),
            }));

            if(tableItem) tableItem.data = dataWithActions;

        } catch (error) {
            console.error("Error cargando productos:", error);
            generarMensaje('No se pudo conectar con el servidor', 'error');
            if(tableItem) tableItem.data = [];
        } finally {
            setLoading(false);
            setPageData(updatedData);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este pastel?')) return;

        try {
            await ProductosService.deleteProducto(id);
            generarMensaje('¡Producto eliminado correctamente!', 'success');
            loadData(); // Recargamos la tabla
        } catch (error) {
            console.error(error);
            generarMensaje('Error al eliminar (¿El producto está en un carrito?)', 'error');
        }
    };

    return (
        <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            {loading && (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            <Container className="py-5">
                {/* Botón de Acción Flotante/Superior */}
                <div className="d-flex justify-content-end mb-3">
                    <Button 
                        text="Nuevo Producto"
                        onClick={() => navigate('/admin/productos/crear')}
                        className="bg-success text-white border-0 px-4 py-2 fw-bold shadow-sm hover:scale-105"
                    />
                </div>

                {/* Renderizado de la Sección (Texto + Tabla) */}
                <Section content={pageData} />
            </Container>
        </div>
    );
}

export default HomeProductos;