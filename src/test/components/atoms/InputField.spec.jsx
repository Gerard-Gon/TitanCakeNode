import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from '../../../components/atoms/InputField';

describe('InputField component', () => {
  it('should render an input with the correct type and placeholder', () => {
    render(<InputField type="email" placeholder="Correo electrónico" value="" onChange={() => {}} />);
    const input = screen.getByPlaceholderText('Correo electrónico');

    expect(input.tagName).toBe('INPUT');
    expect(input.getAttribute('type')).toBe('email');
    expect(input.className).toContain('mb-2');
  });

  it('should display the provided value', () => {
    render(<InputField type="text" value="Oscar" onChange={() => {}} placeholder="Nombre" />);
    const input = screen.getByDisplayValue('Oscar');

    expect(input).toBeTruthy();
    expect(input.getAttribute('type')).toBe('text');
  });

  it('should call onChange when the value changes', () => {
    const handleChange = jasmine.createSpy('handleChange');
    render(<InputField type="text" value="" onChange={handleChange} placeholder="Nombre" />);
    const input = screen.getByPlaceholderText('Nombre');

    fireEvent.change(input, { target: { value: 'Nuevo valor' } });
    expect(handleChange).toHaveBeenCalled();
  });
});