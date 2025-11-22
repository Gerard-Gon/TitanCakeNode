// src/pages/auth/LoginPage.jsx
import React from 'react';
import { LoginForm } from '../../components/organisms/LoginForm';
import "../../styles/pages/login.css";

export default function LoginPage() {
  return (
    /* 1. El wrapper externo se encarga de ocupar la pantalla y centrar lo de adentro */
    <div className="login-wrapper">
      
      {/* 2. La tarjeta interna (container) solo se preocupa de su diseño */}
      <div className="login-container">
        <LoginForm />
      </div>

    </div>
  );
}