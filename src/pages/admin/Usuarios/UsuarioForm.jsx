// src/pages/admin/Usuarios/UsuarioForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import UserService from '../../../services/UserService';
import { generarMensaje } from '../../../utils/GenerarMensaje';
import Input from '../../../components/atoms/Input';
import Button from '../../../components/atoms/Button';
import '../../../styles/pages/login.css'; 

function UsuarioForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        contrasena: ''
    });
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            UserService.getUsuarioById(id)
                .then(res => {
                    const user = res.data;
                    setFormData({
                        nombre: user.nombre,
                        correo: user.correo,
                        contrasena: '' 
                    });
                })
                .catch(err => {
                    console.error(err);
                    generarMensaje("Error cargando el usuario", "error");
                    navigate('/admin/users');
                })
                .finally(() => setLoading(false));
        }
    }, [id, isEditing, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.nombre || !formData.correo) {
            generarMensaje("Nombre y correo son obligatorios", "warning");
            return;
        }
        if (!isEditing && !formData.contrasena) {
            generarMensaje("La contraseña es obligatoria para nuevos usuarios", "warning");
            return;
        }

        setLoading(true);
        
        const payload = {
            ...formData,
            rol: { id: 2 } 
        };

        if (isEditing && !formData.contrasena) {
            delete payload.contrasena;
        }

        try {
            if (isEditing) {
                await UserService.updateUsuario(id, payload);
                generarMensaje("¡Usuario actualizado!", "success");
            } else {
                await UserService.createUser(payload);
                generarMensaje("¡Nuevo usuario creado!", "success");
            }s
            navigate('/admin/users');
        } catch (error) {
            console.error(error);
            generarMensaje("Error al guardar", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container" style={{ maxWidth: '600px', height: 'auto' }}> 
                
                <h1 className="form-title text-center mb-4">
                    {isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}
                </h1>

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    <Input 
                        name="nombre" 
                        placeholder="Nombre Completo" 
                        value={formData.nombre} 
                        onChange={handleChange} 
                        required 
                        className="login-input"
                    />

                    <Input 
                        type="email"
                        name="correo" 
                        placeholder="Correo Electrónico" 
                        value={formData.correo} 
                        onChange={handleChange} 
                        required 
                        className="login-input"
                    />

                    <Input 
                        type="password"
                        name="contrasena" 
                        placeholder={isEditing ? "Nueva Contraseña (opcional)" : "Contraseña"} 
                        value={formData.contrasena} 
                        onChange={handleChange} 
                        required={!isEditing} 
                        className="login-input"
                    />

                    <div className="d-flex gap-3 mt-4">
                        <Button 
                            type="button" 
                            onClick={() => navigate('/admin/users')}
                            className="login-btn w-50"
                            style={{ fontSize: '24px', backgroundColor: '#8d6e63', color: 'white', borderColor: 'white' }}
                        >
                            Cancelar
                        </Button>
                        
                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="login-btn w-50"
                        >
                            {loading ? <Spinner size="sm" /> : (isEditing ? 'Guardar' : 'Crear')}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default UsuarioForm;