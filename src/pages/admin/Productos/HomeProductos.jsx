// src/pages/admin/Productos/HomeProductos.jsx
import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import Section from '../../../components/templates/Section';
import Button from '../../../components/atoms/Button';
import CreateModal from '../../../components/organisms/CreateModal';
import { generarMensaje } from '../../../utils/GenerarMensaje';
import ProductosService from '../../../services/ProductService';
import productData from './data/productoData';
import '../../../styles/pages/admin.css';
import '../../../styles/pages/login.css'; 

const createInputs = [
  { name: "nombreProducto", type: "text", placeholder: "Nombre del Pastel", required: true },
  { name: "descripcionProducto", type: "textarea", placeholder: "Descripción...", required: true },
  { name: "precio", type: "number", placeholder: "Precio", required: true },
  { name: "stock", type: "number", placeholder: "Stock", required: true },
  { name: "imageUrl", type: "file" },
];

function HomeProductos() {
    const [pageData, setPageData] = useState(productData);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const loadData = async () => {
        const updatedData = JSON.parse(JSON.stringify(productData));
        const tableItem = updatedData.find(i => i.type === "table");

        if (updatedData[0]?.text) {
            
            updatedData[0].text[0].className = "form-title text-center text-dark"; 
        }

        try {
            setLoading(true);
            const response = await ProductosService.getAllProductos();
            const productosBackend = response.data;

            const dataWithActions = productosBackend.map(prod => ({
                id: prod.id,
                imagen: prod.imageUrl ? (
                    <img src={prod.imageUrl} alt="mini" className="titan-table-img" />
                ) : 'Sin foto',
                nombre: <span className="titan-table-name">{prod.nombreProducto}</span>,
                precio: <span className="titan-table-price">${prod.precio.toLocaleString('es-CL')}</span>,
                stock: prod.stock,
                onEdit: () => handleOpenEdit(prod),
                onDelete: () => handleDelete(prod.id),
            }));

            if(tableItem) {
                tableItem.data = dataWithActions;
            }
        } catch (error) {
            console.error(error);
            generarMensaje('Error conectando con el servidor', 'error');
            if(tableItem) tableItem.data = [];
        } finally {
            setLoading(false);
            setPageData(updatedData);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleOpenEdit = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleCreateOrUpdate = async (formData) => {
        if (!formData.imageUrl) {
            generarMensaje('La imagen es obligatoria', 'warning');
            return;
        }

        setSubmitLoading(true);
        try {
            const payload = {
                ...formData,
                precio: parseInt(formData.precio),
                stock: parseInt(formData.stock),
                categoria: { id: 1 }
            };

            if (editingProduct) {
                await ProductosService.updateProducto(editingProduct.id, payload);
                generarMensaje('¡Pastel actualizado con éxito!', 'success');
            } else {
                await ProductosService.createProducto(payload);
                generarMensaje('¡Nuevo pastel creado!', 'success');
            }

            await loadData();
            setIsModalOpen(false);
            setEditingProduct(null);
        } catch (error) {
            console.error(error);
            generarMensaje('Error al guardar.', 'error');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Eliminar este pastel?')) return;
        try {
            await ProductosService.deleteProducto(id);
            generarMensaje('Eliminado correctamente', 'success');
            loadData();
        } catch (error) {
            generarMensaje('No se pudo eliminar', 'error');
        }
    };

    return (
        <div className="titan-page-bg">
            {loading && (
                <div className="titan-spinner-container">
                    <Spinner animation="border" className="titan-spinner" />
                </div>
            )}

            <Container>
                <div className="d-flex justify-content-end mb-4">
                    <Button 
                        onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
                        className="login-btn titan-btn-create" 
                    >
                        + Nuevo Pastel
                    </Button>
                </div>

                <div className="titan-table-container">
                    <Section content={pageData} />
                </div>
            </Container>

            <CreateModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingProduct(null); }}
                onSubmit={handleCreateOrUpdate}
                inputsConfig={createInputs}
                title={editingProduct ? "Editar Pastel" : "Nuevo Pastel"}
                submitText={editingProduct ? "Guardar Cambios" : "Crear"}
                loading={submitLoading}
                initialData={editingProduct || {}}
            />
        </div>
    );
}

export default HomeProductos;