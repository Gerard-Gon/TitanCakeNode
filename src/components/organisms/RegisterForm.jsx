import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterFields } from '../molecules/RegisterFields';
import { SubmitButton } from '../atoms/SubmitButton';
import React from 'react';

export function RegisterForm() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (nombre.length > 100) {
      alert('El nombre no puede tener más de 100 caracteres.');
      return;
    }

    if (apellido.length > 100) {
      alert('El apellido no puede tener más de 100 caracteres.');
      return;
    }

    if (!correo.includes('@') || !correo.endsWith('@duoc.cl')) {
      alert('El correo debe contener "@" y terminar en "@duoc.cl".');
      return;
    }

    const contraseñaValida = /[A-Z]/.test(contraseña) && /\d/.test(contraseña);
    if (!contraseñaValida) {
      alert('La contraseña debe tener al menos una letra mayúscula y un número.');
      return;
    }

    const nuevoUsuario = {
      nombre,
      apellido,
      correo,
      contraseña,
    };

    localStorage.setItem('usuarioTitanCake', JSON.stringify(nuevoUsuario));
    console.log('Registro guardado en localStorage:', nuevoUsuario);

    setNombre('');
    setApellido('');
    setCorreo('');
    setContraseña('');

    alert('¡Tu cuenta ha sido registrada con éxito!');
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <RegisterFields
        nombre={nombre}
        setNombre={setNombre}
        apellido={apellido}
        setApellido={setApellido}
        correo={correo}
        setCorreo={setCorreo}
        contraseña={contraseña}
        setContraseña={setContraseña}
      />
      <SubmitButton label="Crear cuenta" />
    </form>
  );
}
