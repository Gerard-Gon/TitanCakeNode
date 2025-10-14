import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RegisterFields } from '../../../components/molecules/RegisterFields';

describe('RegisterFields component', () => {
  it('should render all input fields with correct placeholders', () => {
    render(
      <RegisterFields
        nombre=""
        setNombre={() => {}}
        apellido=""
        setApellido={() => {}}
        correo=""
        setCorreo={() => {}}
        contraseña=""
        setContraseña={() => {}}
      />
    );

    expect(screen.getByPlaceholderText('Nombre')).toBeTruthy();
    expect(screen.getByPlaceholderText('Apellido')).toBeTruthy();
    expect(screen.getByPlaceholderText('Correo electrónico')).toBeTruthy();
    expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy();
  });

  it('should display the provided values', () => {
    render(
      <RegisterFields
        nombre="Oscar"
        setNombre={() => {}}
        apellido="González"
        setApellido={() => {}}
        correo="oscar@correo.cl"
        setCorreo={() => {}}
        contraseña="clave123"
        setContraseña={() => {}}
      />
    );

    expect(screen.getByDisplayValue('Oscar')).toBeTruthy();
    expect(screen.getByDisplayValue('González')).toBeTruthy();
    expect(screen.getByDisplayValue('oscar@correo.cl')).toBeTruthy();
    expect(screen.getByDisplayValue('clave123')).toBeTruthy();
  });

  it('should call setters on input change', () => {
    const mockSetNombre = jasmine.createSpy('setNombre');
    const mockSetApellido = jasmine.createSpy('setApellido');
    const mockSetCorreo = jasmine.createSpy('setCorreo');
    const mockSetContraseña = jasmine.createSpy('setContraseña');

    render(
      <RegisterFields
        nombre=""
        setNombre={mockSetNombre}
        apellido=""
        setApellido={mockSetApellido}
        correo=""
        setCorreo={mockSetCorreo}
        contraseña=""
        setContraseña={mockSetContraseña}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Nombre'), {
      target: { value: 'NuevoNombre' },
    });
    fireEvent.change(screen.getByPlaceholderText('Apellido'), {
      target: { value: 'NuevoApellido' },
    });
    fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), {
      target: { value: 'nuevo@correo.cl' },
    });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: 'nuevaClave' },
    });

    expect(mockSetNombre).toHaveBeenCalledWith('NuevoNombre');
    expect(mockSetApellido).toHaveBeenCalledWith('NuevoApellido');
    expect(mockSetCorreo).toHaveBeenCalledWith('nuevo@correo.cl');
    expect(mockSetContraseña).toHaveBeenCalledWith('nuevaClave');
  });
});