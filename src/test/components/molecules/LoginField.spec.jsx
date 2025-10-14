import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginFields } from '../../../components/molecules/LoginFields';

describe('LoginFields component', () => {
  it('should render username and password input fields', () => {
    render(
      <LoginFields
        username=""
        setUsername={() => {}}
        password=""
        setPassword={() => {}}
      />
    );

    expect(screen.getByPlaceholderText('Correo Electronico')).toBeTruthy();
    expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy();
  });

  it('should display the provided values', () => {
    render(
      <LoginFields
        username="oscar@correo.cl"
        setUsername={() => {}}
        password="123456"
        setPassword={() => {}}
      />
    );

    expect(screen.getByDisplayValue('oscar@correo.cl')).toBeTruthy();
    expect(screen.getByDisplayValue('123456')).toBeTruthy();
  });

  it('should call setUsername and setPassword on input change', () => {
    const mockSetUsername = jasmine.createSpy('setUsername');
    const mockSetPassword = jasmine.createSpy('setPassword');

    render(
      <LoginFields
        username=""
        setUsername={mockSetUsername}
        password=""
        setPassword={mockSetPassword}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Correo Electronico'), {
      target: { value: 'nuevo@correo.cl' },
    });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: 'nuevaClave' },
    });

    expect(mockSetUsername).toHaveBeenCalledWith('nuevo@correo.cl');
    expect(mockSetPassword).toHaveBeenCalledWith('nuevaClave');
  });
});