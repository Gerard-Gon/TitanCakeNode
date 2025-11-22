// src/pages/auth/create-user.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Forms from '../../components/templates/Forms';
import { generarMensaje } from '../../utils/GenerarMensaje';
import UserService from '../../services/UserService';
import "../../styles/pages/login.css"; // Importamos los mismos estilos del login

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
            const usuario = {
                "nombre": form.nombre,
                "correo": form.correo,
                "contrasena": form.contrasena,
                rol: {
                    "id": 3 // Rol de usuario por defecto
                }
            }
            await UserService.createUser(usuario);

            generarMensaje('¡Usuario creado con éxito!', 'success');

            // Redirigir al login después de un breve momento
            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (error) {
            const msg = error.response?.data?.message || 'Error al crear usuario';
            generarMensaje(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    // Configuración del formulario con el diseño TitanCake
    const registerData = [
        {
            type: "text",
            text: [
                {
                    content: "Crear Cuenta",
                    variant: "h1",
                    className: "text-center form-title", // Título con fuente Cream Cake
                },
                {
                    content: "Únete a la familia TitanCake",
                    variant: "p",
                    className: "text-center mb-4 opacity-75",
                }
            ]
        },
        {
            type: "inputs",
            inputs: [
                {
                    type: "text",
                    placeholder: "Nombre de usuario",
                    name: "nombre",
                    value: form.nombre,
                    onChange: handleChange,
                    required: true,
                    autoComplete: "off",
                    className: "w-full login-input mb-3", // Input estilo beige
                },
                {
                    type: "email",
                    placeholder: "Correo Electrónico",
                    name: "correo",
                    value: form.correo,
                    onChange: handleChange,
                    required: true,
                    autoComplete: "off",
                    className: "w-full login-input mb-3",
                },
                {
                    type: "password",
                    placeholder: "Contraseña",
                    name: "contrasena",
                    value: form.contrasena,
                    onChange: handleChange,
                    required: true,
                    autoComplete: "new-password",
                    className: "w-full login-input",
                },
            ],
            className: "space-y-4"
        },
        {           
            type: "button",
            text: loading ? "Registrando..." : "Registrarse",
            className: "w-full mt-4 mb-3 login-btn", // Botón estilo TitanCake
            disabled: loading
        },
        {
            type: "text",
            text: [
                {
                    content: (
                        <span className="login-text">
                            ¿Ya tienes cuenta?
                            <Link
                                to="/login"
                                className="login-link"
                            >
                                Inicia sesión aquí
                            </Link>
                        </span>
                    ),
                    variant: "div",
                    className: "text-center mt-3",
                },
            ],
        },
    ];

    return (
        <div className="login-wrapper"> {/* Centrador vertical y fondo */}
            <div className="login-container"> {/* Tarjeta marrón */}
                <form onSubmit={handleSubmit}>
                    <Forms content={registerData} />
                </form>
            </div>
        </div>
    );
};

export default CreateUser;