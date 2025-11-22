import React from 'react';
import { LoginForm } from '../../components/organisms/LoginForm';
import "../../styles/pages/login.css";

export default function LoginPage() {
  return (
    <div className="login-container centrador login-wrapper">
      <h2 className="text-center">Bienvenido a TitanCake</h2>
      <LoginForm />
    </div>
  );
}