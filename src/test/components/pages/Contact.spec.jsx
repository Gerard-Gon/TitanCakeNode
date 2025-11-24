import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Contact from '../../../pages/user/Contact';
import { MemoryRouter } from 'react-router-dom';

describe('Contact component', () => {
  beforeEach(() => {
    spyOn(window, 'alert').and.callFake(() => {});
  });

  it('should render title and form inputs', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    expect(screen.getByText('Contacto')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingresa tu nombre')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingresa tu correo')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingrese el mensaje')).toBeTruthy();
    expect(screen.getByText('Enviar')).toBeTruthy();
    expect(screen.getByText('Limpiar')).toBeTruthy();
  });

  it('should show alert if name exceeds 100 characters', () => {
    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText('Ingresa tu nombre'), {
      target: { value: 'A'.repeat(101) },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingresa tu correo'), {
      target: { value: 'oscar@duoc.cl' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingrese el mensaje'), {
      target: { value: 'Hola' },
    });

    fireEvent.click(screen.getByText('Enviar'));
    expect(window.alert).toHaveBeenCalledWith('El nombre no puede tener más de 100 caracteres.');
  });

  it('should show alert if email is invalid', () => {
    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText('Ingresa tu nombre'), {
      target: { value: 'Oscar' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingresa tu correo'), {
      target: { value: 'oscar@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingrese el mensaje'), {
      target: { value: 'Hola' },
    });

    fireEvent.click(screen.getByText('Enviar'));
    expect(window.alert).toHaveBeenCalledWith('El correo debe terminar en @duoc.cl');
  });

  it('should show alert if mensaje exceeds 500 characters', () => {
    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText('Ingresa tu nombre'), {
      target: { value: 'Oscar' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingresa tu correo'), {
      target: { value: 'oscar@duoc.cl' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingrese el mensaje'), {
      target: { value: 'M'.repeat(501) },
    });

    fireEvent.click(screen.getByText('Enviar'));
    expect(window.alert).toHaveBeenCalledWith('El mensaje no puede tener más de 500 caracteres.');
  });

  it('should show formatted alert and clear form on valid input', () => {
    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText('Ingresa tu nombre'), {
      target: { value: 'Oscar' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingresa tu correo'), {
      target: { value: 'oscar@duoc.cl' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingrese el mensaje'), {
      target: { value: 'Hola, esto es un mensaje.' },
    });

    fireEvent.click(screen.getByText('Enviar'));

    expect(window.alert).toHaveBeenCalledWith(
      'Nombre: Oscar\nCorreo: oscar@duoc.cl\nMensaje: Hola, esto es un mensaje.'
    );
    expect(screen.getByPlaceholderText('Ingresa tu nombre').value).toBe('');
    expect(screen.getByPlaceholderText('Ingresa tu correo').value).toBe('');
    expect(screen.getByPlaceholderText('Ingrese el mensaje').value).toBe('');
  });

  it('should clear form when clicking "Limpiar"', () => {
    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText('Ingresa tu nombre'), {
      target: { value: 'Oscar' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingresa tu correo'), {
      target: { value: 'oscar@duoc.cl' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingrese el mensaje'), {
      target: { value: 'Hola' },
    });

    fireEvent.click(screen.getByText('Limpiar'));

    expect(screen.getByPlaceholderText('Ingresa tu nombre').value).toBe('');
    expect(screen.getByPlaceholderText('Ingresa tu correo').value).toBe('');
    expect(screen.getByPlaceholderText('Ingrese el mensaje').value).toBe('');
  });
});