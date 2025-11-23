import React, { useState, useEffect } from 'react';
import Section from '../../../components/templates/Section';
import CreateModal from '../../../components/organisms/CreateModal';
import Button from '../../../components/atoms/Button';
import productData from '../../../data/productoData';
// CORRECCIÓN: Asegúrate que el nombre del archivo coincida (ProductService vs ProductosService)
import ProductosService from '../../../services/ProductService'; 
import { generarMensaje } from '../../../utils/GenerarMensaje';

// CONFIGURACIÓN: Usamos los nombres exactos que espera el Backend (Spring Boot)
const createInputs = [
  { name: "nombreProducto", type: "text", placeholder: "Nombre del Producto", required: true },
  { name: "descripcionProducto", type: "textarea", placeholder: "Descripción", required: true, className: "h-28" },
  { name: "stock", type: "number", placeholder: "Stock", required: true },
  { name: "precio", type: "number", placeholder: "Precio", required: true },
  { name: "imageUrl", type: "text", placeholder: "URL de la imagen", required: false },
];

function ProductsHome() {
  const [pageData, setPageData] = useState(productData);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const loadData = async () => {
    const updatedData = [...pageData];
    const tableItem = updatedData.find(i => i.service === "productos");

    if (tableItem) {
      try {
        setLoading(true);
        // 1. Obtenemos la data cruda del backend (con nombreProducto, imageUrl, etc.)
        const response = await ProductosService.getAllProductos();
        const data = response.data; 

        // 2. Preparamos la data para la tabla
        const dataWithActions = data.map(producto => ({
          ...producto,
          // IMPORTANTE: Mapeamos los campos del backend a lo que espera la columna de la tabla
          nombre: producto.nombreProducto,          // La tabla busca la columna "Nombre" -> usa row.nombre
          descripcion: producto.descripcionProducto, // La tabla busca "descripcion" -> usa row.descripcion
          
          // Acciones
          onEdit: () => handleOpenEdit(producto),
          onDelete: () => handleDelete(producto.id),
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

  const handleOpenEdit = (producto) => {
    // Como el 'producto' ya viene con las llaves del backend (nombreProducto, etc.)
    // y nuestros inputs (createInputs) usan esos mismos nombres, ¡pasa directo!
    setEditingProduct(producto);
    setIsModalOpen(true);
  };

  const handleCreate = async (formData) => {
    setSubmitLoading(true);
    try {
      if (editingProduct) {
        await ProductosService.updateProducto(editingProduct.id, formData);
        generarMensaje('¡Producto actualizado con éxito!', 'success');
      } else {
        await ProductosService.createProducto(formData);
        generarMensaje('¡Producto creado con éxito!', 'success');
      }

      // Recargamos la tabla para ver los cambios
      loadData();

      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error(error);
      generarMensaje('Error al guardar el producto', 'error');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      await ProductosService.deleteProducto(id);
      generarMensaje('¡Producto eliminado con éxito!', 'success');
      loadData(); // Recargar datos
    } catch (error) {
      console.error(error);
      generarMensaje('Error al eliminar el producto', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      )}

      <div className="container py-6 flex justify-end">
        <Button
          text="Crear Producto"
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md active:scale-95 transition-all"
        />
      </div>

      <Section content={pageData} className="container" />

      <CreateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleCreate}
        inputsConfig={createInputs}
        title={editingProduct ? "Editar Producto" : "Crear Nuevo Producto"}
        submitText={editingProduct ? "Actualizar" : "Crear"}
        loading={submitLoading}
        initialData={editingProduct || {}}
      />
    </div>
  );
}

export default ProductsHome;