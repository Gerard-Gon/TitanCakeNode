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
      const response = await UserService.login(form);
      
      const usuarioBackend = response.data;

      const userData = {
        id: usuarioBackend.id,
        nombre: usuarioBackend.nombre,
        correo: usuarioBackend.correo,
        rol: usuarioBackend.rol 
      };

      login(userData); 
      
      generarMensaje(`¡Bienvenido ${usuarioBackend.nombre}!`, "success");

      if (usuarioBackend.rol && usuarioBackend.rol.id === 1) {
          navigate("/admin/HomeAdmin");
      } else {
          navigate("/");
      }

    } catch (error) {
      console.error("Error Login:", error);
      if (error.response && error.response.status === 401) {
        generarMensaje("Correo o contraseña incorrectos", "error");
      } else {
        generarMensaje("Error de conexión con el servidor", "error");
      }
    } finally {
      setLoading(false);
    }
  };

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
    <form onSubmit={handleSubmit}>
      <Forms content={formDataWithHandlers} />
    </form>
  );
}