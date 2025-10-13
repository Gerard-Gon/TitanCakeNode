import { RegisterForm } from '../components/organisms/RegisterForm';
import '../styles/pages/login.css'; // Reutilizamos estilos para mantener coherencia

export function RegisterPage() {
  return (
    <div className="login-container centrador login-wrapper">
      <h2 className="text-center">Regístrate en TitanCake</h2>
      <RegisterForm />
    </div>
  );
}
