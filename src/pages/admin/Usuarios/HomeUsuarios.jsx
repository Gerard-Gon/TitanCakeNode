import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import Section from '../../../components/templates/Section';
import Button from '../../../components/atoms/Button';
import CreateModal from '../../../components/organisms/CreateModal';
import { generarMensaje } from '../../../utils/GenerarMensaje';
import UserService from '../../../services/UserService';
import { usuarioData } from './data/usuarioData'; 
import '../../../styles/pages/admin.css';
import '../../../styles/pages/login.css';

const createInputs = [
  { name: "nombre", type: "text", placeholder: "Nombre Completo", required: true },
  { name: "correo", type: "email", placeholder: "Correo Electrónico", required: true },
  { name: "contrasena", type: "password", placeholder: "Contraseña", required: true },
];

function HomeUsuarios() {
    const [pageData, setPageData] = useState(usuarioData);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [editingUsuario, setEditingUsuario] = useState(null);

    const loadData = async () => {
        const updatedData = JSON.parse(JSON.stringify(usuarioData));
        const tableItem = updatedData.find(i => i.service === "usuarios" || i.type === "table");
        if (updatedData[0]?.text) {
            updatedData[0].text[0].className = "form-title text-center text-dark"; 
        }

        try {
            setLoading(true);
            const response = await UserService.getAllUsuarios();
            const usuariosBackend = response.data;

            const dataWithActions = usuariosBackend.map(user => ({
                id: user.id,
                nombre: <span className="titan-table-name" style={{ fontSize: '20px' }}>{user.nombre}</span>,
                correo: user.correo,
                rol: user.rol ? user.rol.nombre : 'Cliente', 
                onEdit: () => handleOpenEdit(user),
                onDelete: () => handleDelete(user.id),
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

    const handleOpenEdit = (usuario) => {
        setEditingUsuario(usuario);
        setIsModalOpen(true);
    };

    const handleCreateOrUpdate = async (formData) => {

        if (!formData.nombre || !formData.correo) {
            generarMensaje('Nombre y correo son obligatorios', 'warning');
            return;
        }

        if (!editingUsuario && !formData.contrasena) {
            generarMensaje('La contraseña es obligatoria', 'warning');
            return;
        }

        setSubmitLoading(true);
        try {
            const payload = {
                ...formData,
                rol: { id: 2 }
            };

            if (editingUsuario) {
                if (!formData.contrasena) delete payload.contrasena;
                await UserService.updateUsuario(editingUsuario.id, payload);
                generarMensaje('¡Usuario actualizado con éxito!', 'success');
            } else {
                await UserService.createUser(payload);
                generarMensaje('¡Nuevo usuario creado!', 'success');
            }

            await loadData();
            setIsModalOpen(false);
            setEditingUsuario(null);
        } catch (error) {
            console.error(error);
            generarMensaje('Error al guardar.', 'error');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Eliminar este usuario?')) return;
        try {
            await UserService.deleteUsuario(id);
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
                        onClick={() => { setEditingUsuario(null); setIsModalOpen(true); }}
                        className="login-btn titan-btn-create"
                    >
                        + Nuevo Usuario
                    </Button>
                </div>

                <div className="titan-table-container">
                    <Section content={pageData} />
                </div>
            </Container>

            <CreateModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingUsuario(null); }}
                onSubmit={handleCreateOrUpdate}
                inputsConfig={createInputs}
                title={editingUsuario ? "Editar Usuario" : "Nuevo Usuario"}
                submitText={editingUsuario ? "Guardar Cambios" : "Crear"}
                loading={submitLoading}
                initialData={editingUsuario || {}}
            />
        </div>
    );
}

export default HomeUsuarios;