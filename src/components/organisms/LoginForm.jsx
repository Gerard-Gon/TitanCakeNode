import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Forms from "../../components/templates/Forms"; // componente que renderiza loginData
import { generarMensaje } from "../../utils/GenerarMensaje";
import UserService from "../../services/UserService";
import { useAuth } from "../../context/AuthContext";
import loginData from "../../pages/auth/data/loginData";

export function LoginForm() {
  // Estado del formulario
  const [form, setForm] = useState({ correo: "", contrasena: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // contexto de autenticación

  // Maneja cambios en los inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!form.correo || !form.contrasena) {
      generarMensaje("Completa todos los campos", "warning");
      return;
    }

    setLoading(true);

    try {
      // Llamada al servicio de login
      const response = await UserService.login(form);
      const usuario = response.data; // usuario completo desde el backend

      // Guardar usuario en localStorage (sin token)
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: usuario.id,
          nombre: usuario.nombre,
          rol: usuario.rol,
        })
      );

      // Guardar usuario en el contexto global
      login({
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol,
      });

      generarMensaje(`¡Bienvenido ${usuario.nombre}!`, "success");

      // Redirección según rol
      setTimeout(() => {
        if (usuario.rol.id === 1 || usuario.rol.id === 2) {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }, 1500);
    } catch (error) {
      const msg = error.response?.data || "Credenciales inválidas";
      generarMensaje(msg, "error");
    } finally {
      setLoading(false);
      setForm({ correo: "", contrasena: "" }); // limpiar formulario
    }
  };

  // Adaptar loginData con handlers y valores dinámicos
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
        text: loading ? "Iniciando..." : item.text,
      };
    }

    if (item.type === "text" && item.text[0].content.type === "button") {
      // Ajustar el botón "Crear usuario" para usar navigate
      return {
        ...item,
        key: index,
        text: [
          {
            ...item.text[0],
            content: (
              <button
                type="button"
                onClick={() => navigate("/create-user")}
                className="text-indigo-400 hover:text-indigo-300 underline transition"
              >
                Crear usuario
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
