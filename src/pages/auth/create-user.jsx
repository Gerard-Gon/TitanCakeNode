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
            const usuarioParaBackend = {
                nombre: form.nombre,
                correo: form.correo,
                contrasena: form.contrasena,
                rol: {
                    id: 2 
                }
            };

            console.log("Enviando usuario:", usuarioParaBackend); 
            await UserService.createUser(usuarioParaBackend);

            generarMensaje('¡Usuario creado con éxito!', 'success');
            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (error) {
            console.error("Error al registrar:", error);
            const msg = error.response?.data?.message || 'Error al crear usuario. Verifica tu conexión o si el correo ya existe.';
            generarMensaje(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    const registerData = [
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
            onClick: handleSubmit 
        },

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
                <form onSubmit={handleSubmit}>
                    <Forms content={registerData} />
                </form>
            </div>
        </div>
    );
};

export default CreateUser;