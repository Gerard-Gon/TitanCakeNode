// src/pages/auth/data/loginData.jsx
import React from 'react'; // Necesario para usar JSX en la propiedad content

const loginData = [
    {
        type: "text",
        text: [
            {
                content: "TitanCake",
                variant: "h1",
                className: "text-center form-title", // Usa la nueva clase con fuente Cream Cake
            },
            {
                content: "Inicia sesión para continuar",
                variant: "p",
                className: "text-center mb-4 text-white opacity-75",
            }
        ]
    },
    {
        type: "inputs",
        inputs: [
            {
                type: "email",
                placeholder: "Correo Electrónico",
                name: "correo",
                required: true,
                autoComplete: "off",
                // Eliminamos bordes e indigo, usamos nuestra clase login-input
                className: "w-full login-input mb-3", 
            },
            {
                type: "password",
                placeholder: "Contraseña",
                name: "contrasena",
                required: true,
                autoComplete: "current-password",
                className: "w-full login-input",
            },
        ],
        className: "space-y-4"
    },
    {           
        type: "button",
        text: "Ingresar",
        // Botón grande y personalizado
        className: "w-full mt-4 mb-3 login-btn", 
    },
    {
        type: "text",
        text: [
            {
                content: (
                    <span className="login-text">
                        ¿No tienes cuenta? 
                        <button
                            type="button"
                            onClick={() => window.location.href = '/create-user'} 
                            className="login-link bg-transparent border-0 p-0 inline-block"
                        >
                            Regístrate aquí
                        </button>
                    </span>
                ),
                variant: "div",
                className: "text-center mt-3",
            },
        ],
    },
];

export default loginData;