import { InputField } from '../atoms/InputField';

export function LoginFields({ username, setUsername, password, setPassword }) {
  return (
    <>
      <InputField
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Correo Electronico"
      />
      <InputField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
    </>
  );
}
