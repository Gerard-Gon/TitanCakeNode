import React, { useState, useEffect } from 'react';
import Section from '../../../components/templates/Section';
import CreateModal from '../../../components/organisms/CreateModal';
import Button from '../../../components/atoms/Button';
import productData from '../../../data/productoData';
import ProductosService from '../../../services/ProductosService';
import { generarMensaje } from '../../../utils/GenerarMensaje';

const createInputs = [
  { name: "nombre", type: "text", placeholder: "Nombre", required: true },
  { name: "descripcion", type: "textarea", placeholder: "Descripción", required: true, className: "h-28" },
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

  useEffect(() => {
    const loadData = async () => {
      const updatedData = [...pageData];
      const tableItem = updatedData.find(i => i.service === "productos");

      if (tableItem) {
        try {
          setLoading(true);
          const data = await ProductosService.getAllProductos();
          const dataWithActions = data.map(producto => ({
            ...producto,
            onEdit: () => handleOpenEdit(producto),
            onDelete: () => handleDelete(producto.id),
          }));
          tableItem.data = dataWithActions;
        } catch (error) {
          generarMensaje('No se pudieron cargar los productos', 'warning');
          tableItem.data = [{ id: "Error", nombre: "No se pudieron cargar", descripcion: "Revisa tu conexión" }];
        } finally {
          setLoading(false);
        }
      }
      setPageData(updatedData);
    };

    loadData();
  }, []);

  const handleOpenEdit = (producto) => {
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

      const data = await ProductosService.getAllProductos();
      const dataWithActions = data.map(producto => ({
        ...producto,
        onEdit: () => handleOpenEdit(producto),
        onDelete: () => handleDelete(producto.id),
      }));

      const updatedData = [...pageData];
      const tableItem = updatedData.find(i => i.service === "productos");
      tableItem.data = dataWithActions;
      setPageData(updatedData);

      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      generarMensaje('Error al guardar el producto', 'warning');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      await ProductosService.deleteProducto(id);
      generarMensaje('¡Producto eliminado con éxito!', 'success');

      const data = await ProductosService.getAllProductos();
      const dataWithActions = data.map(producto => ({
        ...producto,
        onEdit: () => handleOpenEdit(producto),
        onDelete: () => handleDelete(producto.id),
      }));

      const updatedData = [...pageData];
      const tableItem = updatedData.find(i => i.service === "productos");
      tableItem.data = dataWithActions;
      setPageData(updatedData);
    } catch (error) {
      generarMensaje('Error al eliminar el producto', 'warning');
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
          onClick={() => setIsModalOpen(true)}
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