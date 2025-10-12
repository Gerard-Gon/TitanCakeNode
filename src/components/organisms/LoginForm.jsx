import { useState } from 'react';
import { LoginFields } from '../molecules/LoginFields';
import { SubmitButton } from '../atoms/SubmitButton';


export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', username, password);
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

