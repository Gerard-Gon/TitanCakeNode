import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Forms from '../../components/templates/Forms';
import { generarMensaje } from '../../utils/GenerarMensaje';
import UserService from '../../services/UserService';
import "../../styles/pages/login.css";

const CreateUser = () => {
    const [form, setForm] = useState({ nombre: "", correo: "", contrasena: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.correo || !form.contrasena || !form.nombre) {
            generarMensaje('Completa todos los campos', 'warning');
            return;
        }

        setLoading(true);

        try {
            // Construimos el objeto tal como lo pide el Backend (Usuario.java)
            const usuarioParaBackend = {
                nombre: form.nombre,
                correo: form.correo,
                contrasena: form.contrasena,
                // IMPORTANTE: El ID 2 debe existir en tu tabla 'roles' en la base de datos
                // Asumimos que ID 2 es 'CLIENTE' o similar.
                rol: {
                    id: 2 
                }
            };

            console.log("Enviando usuario:", usuarioParaBackend); // Para depuración

            await UserService.createUser(usuarioParaBackend);

            generarMensaje('¡Usuario creado con éxito!', 'success');

            // Redirigir al login después de un momento
            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (error) {
            console.error("Error al registrar:", error);
            // Intentamos leer el mensaje de error del backend si existe
            const msg = error.response?.data?.message || 'Error al crear usuario. Verifica tu conexión o si el correo ya existe.';
            generarMensaje(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    // ... (Mantén el resto de tu configuración 'registerData' y el return igual que antes)
    const registerData = [
        // ... tus inputs configurados
        {
            type: "text",
            text: [{ content: "Crear Cuenta", variant: "h1", className: "text-center form-title" }]
        },
        {
            type: "inputs",
            inputs: [
                {
                    type: "text",
                    placeholder: "Nombre completo",
                    name: "nombre",
                    value: form.nombre,
                    onChange: handleChange,
                    required: true,
                    className: "w-full login-input mb-3",
                },
                {
                    type: "email",
                    placeholder: "Correo Electrónico",
                    name: "correo",
                    value: form.correo,
                    onChange: handleChange,
                    required: true,
                    className: "w-full login-input mb-3",
                },
                {
                    type: "password",
                    placeholder: "Contraseña",
                    name: "contrasena",
                    value: form.contrasena,
                    onChange: handleChange,
                    required: true,
                    className: "w-full login-input",
                },
            ],
            className: "space-y-4"
        },
        {           
            type: "button",
            text: loading ? "Registrando..." : "Registrarse",
            className: "w-full mt-4 mb-3 login-btn",
            disabled: loading,
            onClick: handleSubmit // Nota: Cambié 'onclick' a 'onClick' (React usa camelCase)
        },
        // ... resto del contenido
        {
            type: "text",
            text: [{
                content: (
                    <span className="login-text">
                        ¿Ya tienes cuenta? <Link to="/login" className="login-link">Inicia sesión aquí</Link>
                    </span>
                ),
                variant: "div",
                className: "text-center mt-3",
            }],
        },
    ];

    return (
        <div className="login-wrapper">
            <div className="login-container">
                {/* El formulario maneja el submit */}
                <form onSubmit={handleSubmit}>
                    <Forms content={registerData} />
                </form>
            </div>
        </div>
    );
};

export default CreateUser;