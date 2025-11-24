import React from 'react';
import { render, screen } from '@testing-library/react';
import { RegisterPage } from '../../../pages/user/Registro';
import { MemoryRouter } from 'react-router-dom';

describe('RegisterPage component', () => {
  it('should render the registration title and RegisterForm', () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Regístrate en TitanCake')).toBeTruthy();

  });
});