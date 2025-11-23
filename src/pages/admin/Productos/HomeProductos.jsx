import React, { useState, useEffect } from 'react';
import Section from '../../../components/templates/Section';
import CreateModal from '../../../components/organisms/CreateModal';
import Button from '../../../components/atoms/Button';
import productData from './data/productoData'; // Importamos la configuración de la tabla
import ProductosService from '../../../services/ProductService';
import { generarMensaje } from '../../../utils/GenerarMensaje';

// Configuración de los inputs del Modal.
// Los 'name' deben coincidir con lo que espera el Backend Java,
// EXCEPTO para la imagen, que usamos 'logo' para activar la subida en tu CreateModal actual.
const createInputs = [
  { name: "nombreProducto", type: "text", placeholder: "Nombre del Pastel", required: true },
  { name: "descripcionProducto", type: "textarea", placeholder: "Descripción corta", required: true, className: "h-24" },
  { name: "precio", type: "number", placeholder: "Precio ($)", required: true },
  { name: "stock", type: "number", placeholder: "Unidades en Stock", required: true },
  // Usamos "logo" aquí para que tu componente InputFile funcione, luego lo renombramos a imageUrl antes de enviar.
  { name: "logo", type: "file", label: "Imagen del Producto" }, 
];

function HomeProductos() {
    const [pageData, setPageData] = useState(productData);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
 
    // --- 1. Función para Cargar y Mapear Datos ---
    const loadData = async () => {
        const updatedData = [...pageData];
        // Buscamos la sección de la tabla en la configuración
        const tableItem = updatedData.find(i => i.type === "table" && i.service === "productos");

        if (tableItem) {
            try {
                setLoading(true);
                const response = await ProductosService.getAllProductos();
                const dataBackend = response.data;

                // TRANSFORMACIÓN CLAVE: Datos del Backend -> Datos para la Tabla
                const dataForTable = dataBackend.map(prod => ({
                    // 1. Datos visibles en las columnas (Las claves en minúscula coinciden con los títulos de columns en productoData.jsx)
                    id: prod.id,
                    imagen: prod.imageUrl, // La tabla usará esto para mostrar la miniatura
                    nombre: prod.nombreProducto,
                    descripción: prod.descripcionProducto ? prod.descripcionProducto.substring(0, 50) + '...' : '', // Recortamos descripción larga
                    precio: `$${prod.precio}`, // Formateamos el precio
                    stock: prod.stock,
                    
                    // 2. Datos necesarios para el funcionamiento interno (Modal y Acciones)
                    // Guardamos la URL en 'logo' también para que el Modal la previsualice al editar
                    logo: prod.imageUrl, 
                    // Guardamos los datos crudos del backend para rellenar el formulario de edición
                    originalData: prod, 

                    // 3. Definimos las acciones para esta fila (Esto sustituye a los botones de cliente)
                    onEdit: () => handleOpenEdit(prod),
                    onDelete: () => handleDelete(prod.id),
                }));

                tableItem.data = dataForTable;
            } catch (error) {
                console.error(error);
                generarMensaje('Error al cargar el inventario', 'error');
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

    // --- 2. Manejadores de Acciones ---

    const handleOpenEdit = (productoBackend) => {
        // Preparamos el producto para el modal, asegurando que 'logo' tenga la URL para la previsualización
        setEditingProduct({
            ...productoBackend,
            logo: productoBackend.imageUrl
        });
        setIsModalOpen(true);
    };

    const handleCreateOrUpdate = async (formData) => {
        setSubmitLoading(true);
        try {
            // PREPARACIÓN DE DATOS PARA EL BACKEND JAVA
            const dataToSend = {
                nombreProducto: formData.nombreProducto,
                descripcionProducto: formData.descripcionProducto,
                // Aseguramos que sean números
                precio: parseInt(formData.precio),
                stock: parseInt(formData.stock),
                // IMPORTANTE: Mapeamos la URL que viene del input 'logo' al campo 'imageUrl' que espera Java
                imageUrl: formData.logo, 
                // Asignamos una categoría por defecto si es obligatorio (ajusta el ID según tu BD)
                categoria: { id: 1 } 
            };

            if (editingProduct) {
                // --- MODO EDICIÓN ---
                await ProductosService.updateProducto(editingProduct.id, dataToSend);
                generarMensaje('¡Producto actualizado correctamente!', 'success');
            } else {
                // --- MODO CREACIÓN ---
                await ProductosService.createProducto(dataToSend);
                generarMensaje('¡Producto creado exitosamente!', 'success');
            }

            await loadData(); // Recargamos la tabla para ver los cambios
            setIsModalOpen(false);
            setEditingProduct(null); // Limpiamos el estado de edición

        } catch (error) {
            console.error(error);
            generarMensaje('Hubo un error al guardar el producto.', 'error');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este producto permanentemente?')) return;

        try {
            await ProductosService.deleteProducto(id);
            generarMensaje('Producto eliminado.', 'success');
            loadData(); // Recargamos tabla
        } catch (error) {
            console.error(error);
            // El backend probablemente lance error si el producto está en un carrito
            generarMensaje('Error al eliminar. Verifica si el producto está en carritos activos.', 'error');
        }
    };

    // --- 3. Renderizado ---
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Loader general */}
            {loading && (
                <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                </div>
            )}

            {/* Botón superior para Crear */}
            <div className="container mx-auto flex justify-end mb-4">
                 <Button
                    text="Agregar Nuevo Producto"
                    onClick={() => {
                        setEditingProduct(null); // Modo creación
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow transition-all flex items-center gap-2"
                />
            </div>

            {/* Renderizado de la Tabla (Section usa DynamicTable internamente) */}
            <Section content={pageData} className="container mx-auto bg-white rounded-xl shadow-md p-6" />

            {/* Modal para Crear/Editar */}
            <CreateModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingProduct(null);
                }}
                onSubmit={handleCreateOrUpdate}
                inputsConfig={createInputs}
                title={editingProduct ? `Editar: ${editingProduct.nombreProducto}` : "Crear Nuevo Producto"}
                submitText={editingProduct ? "Guardar Cambios" : "Crear Producto"}
                loading={submitLoading}
                // Pasamos los datos iniciales si estamos editando
                initialData={editingProduct || {}}
            />
        </div>
    );
}

export default HomeProductos;