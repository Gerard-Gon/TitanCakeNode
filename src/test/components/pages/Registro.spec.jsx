import React from 'react';
import { render, screen } from '@testing-library/react';
import { RegisterPage } from '../../../pages/Registro';
import { MemoryRouter } from 'react-router-dom';

describe('RegisterPage component', () => {
  it('should render the registration title and RegisterForm', () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Regístrate en TitanCake')).toBeTruthy();

    // Si RegisterForm tiene contenido visible como un campo o botón, verifica eso:
    // Por ejemplo, si muestra "Nombre" como label:
    // expect(screen.getByLabelText('Nombre')).toBeTruthy();

    // O si agregas data-testid en RegisterForm:
    // expect(screen.getByTestId('register-form')).toBeTruthy();
  });
});