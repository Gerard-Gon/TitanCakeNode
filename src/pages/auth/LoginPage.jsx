
import React from 'react';
import { LoginForm } from '../../components/organisms/LoginForm';
import "../../styles/pages/login.css";

export default function LoginPage() {
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <LoginForm />
      </div>

    </div>
  );
}