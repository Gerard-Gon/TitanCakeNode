import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RegisterForm } from '../../../components/organisms/RegisterForm';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';

describe('RegisterForm component', () => {
  beforeEach(() => {
    localStorage.clear();
    spyOn(window, 'alert').and.callFake(() => {});
  });

  it('should render the form and submit button', () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    expect(screen.getByText('Crear cuenta')).toBeTruthy();
  });

  it('should show alert if nombre exceeds 100 characters', () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), {
      target: { value: 'A'.repeat(101) },
    });
    fireEvent.change(screen.getByPlaceholderText(/Apellido/i), {
      target: { value: 'Astudillo' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Correo/i), {
      target: { value: 'oscar@duoc.cl' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: 'Pastelito1' },
    });

    fireEvent.click(screen.getByText('Crear cuenta'));
    expect(window.alert).toHaveBeenCalledWith('El nombre no puede tener más de 100 caracteres.');
  });

  it('should show alert if correo is invalid', () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), {
      target: { value: 'Oscar' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Apellido/i), {
      target: { value: 'Astudillo' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Correo/i), {
      target: { value: 'oscar@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: 'Pastelito1' },
    });

    fireEvent.click(screen.getByText('Crear cuenta'));
    expect(window.alert).toHaveBeenCalledWith('El correo debe contener "@" y terminar en "@duoc.cl".');
  });

  it('should show alert if contraseña is weak', () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), {
      target: { value: 'Oscar' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Apellido/i), {
      target: { value: 'Astudillo' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Correo/i), {
      target: { value: 'oscar@duoc.cl' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: 'pastelito' }, 
    });

    fireEvent.click(screen.getByText('Crear cuenta'));
    expect(window.alert).toHaveBeenCalledWith('La contraseña debe tener al menos una letra mayúscula y un número.');
  });

  it('should register user and navigate to login on valid input', () => {
    function LocationDisplay() {
      const location = useLocation();
      return <div data-testid="location">{location.pathname}</div>;
    }

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), {
      target: { value: 'Oscar' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Apellido/i), {
      target: { value: 'Astudillo' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Correo/i), {
      target: { value: 'oscar@duoc.cl' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
      target: { value: 'Pastelito1' },
    });

    fireEvent.click(screen.getByText('Crear cuenta'));

    const usuario = JSON.parse(localStorage.getItem('usuarioTitanCake'));
    expect(usuario.nombre).toBe('Oscar');
    expect(usuario.correo).toBe('oscar@duoc.cl');
    expect(window.alert).toHaveBeenCalledWith('¡Tu cuenta ha sido registrada con éxito!');
    expect(screen.getByTestId('location').textContent).toBe('/login');
  });
});