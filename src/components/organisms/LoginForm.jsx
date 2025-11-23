// src/components/organisms/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Forms from "../../components/templates/Forms";
import { generarMensaje } from "../../utils/GenerarMensaje";
import UserService from "../../services/UserService";
import { useAuth } from "../../context/AuthContext";
import loginData from "../../pages/auth/data/loginData";

export function LoginForm() {
  const [form, setForm] = useState({ correo: "", contrasena: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.correo || !form.contrasena) {
      generarMensaje("Completa todos los campos", "warning");
      return;
    }

    setLoading(true);

    try {
      // 1. Enviamos las credenciales al backend
      const response = await UserService.login(form);
      const usuario = response.data;

      // 2. Guardamos la sesión
      // Adaptamos el objeto para guardar solo lo necesario
      const userData = {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol // Guardamos el rol para saber si es admin
      };

      localStorage.setItem("user", JSON.stringify(userData));
      login(userData);

      generarMensaje(`¡Bienvenido ${usuario.nombre}!`, "success");

      // 3. Redirección inteligente basada en el Rol
      setTimeout(() => {
        // Asumimos que rol.id 1 es Admin
        if (usuario.rol && usuario.rol.id === 1) {
            navigate("/admin/dashboard"); // O la ruta de admin que tengas
        } else {
            navigate("/");
        }
      }, 1000);

    } catch (error) {
      console.error(error);
      const msg = error.response?.data || "Credenciales inválidas o error de conexión";
      generarMensaje(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  // ... (El resto del código para mapear loginData se mantiene igual que en la respuesta anterior) ...
  // Si necesitas que repita esa parte del código para copiar y pegar completo, avísame.
  
  // Lógica de mapeo para el Forms
  const formDataWithHandlers = loginData.map((item, index) => {
    if (item.type === "inputs") {
      return {
        ...item,
        inputs: item.inputs.map((input) => ({
          ...input,
          value: form[input.name] || "",
          onChange: handleChange,
        })),
      };
    }
    if (item.type === "button") {
      return {
        ...item,
        key: index,
        onClick: handleSubmit,
        disabled: loading,
        text: loading ? "Ingresando..." : item.text,
      };
    }
    if (item.type === "text" && item.text[0].content.type === "button") {
        // Arreglo para el botón de "Crear usuario" dentro del login
        return {
            ...item,
            key: index,
            text: [
                {
                    ...item.text[0],
                    content: (
                        <button
                            type="button"
                            onClick={() => navigate('/create-user')}
                            className="login-link bg-transparent border-0 p-0 inline-block"
                        >
                            Regístrate aquí
                        </button>
                    ),
                },
            ],
        };
    }
    return { ...item, key: index };
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Forms content={formDataWithHandlers} />
    </form>
  );
}