import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginFields } from '../molecules/LoginFields';
import { SubmitButton } from '../atoms/SubmitButton';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener datos del usuario registrado
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioTitanCake'));

    if (!usuarioGuardado) {
      alert('No hay ninguna cuenta registrada. Por favor regístrate primero.');
      return;
    }

    // Validar credenciales
    if (
      username === usuarioGuardado.correo &&
      password === usuarioGuardado.contraseña
    ) {
      alert(`¡Bienvenido de nuevo, ${usuarioGuardado.nombre}!`);
      console.log('Login exitoso:', usuarioGuardado);
      navigate('/'); // Aquí podrías redirigir al usuario o mostrar contenido exclusivo
    } else {
      alert('Correo o contraseña incorrectos. Intenta nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <LoginFields
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <SubmitButton label="Iniciar sesión" />
    </form>
  );
}

