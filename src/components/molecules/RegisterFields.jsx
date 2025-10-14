import { InputField } from '../atoms/InputField';
import React from 'react';

export function RegisterFields({
  nombre,
  setNombre,
  apellido,
  setApellido,
  correo,
  setCorreo,
  contraseña,
  setContraseña,
}) {
  return (
    <>
      <InputField
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
      />
      <InputField
        type="text"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        placeholder="Apellido"
      />
      <InputField
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Correo electrónico"
      />
      <InputField
        type="password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        placeholder="Contraseña"
      />
    </>
  );
}