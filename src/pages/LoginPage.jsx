import { LoginForm } from '../components/organisms/LoginForm';
import '../styles/pages/login.css';
import React from 'react';

export function LoginPage() {
  return (
    <div className="login-container centrador login-wrapper">
      <h2 className="text-center">Bienvenido a TitanCake</h2>
      <LoginForm />
    </div>
  );
}