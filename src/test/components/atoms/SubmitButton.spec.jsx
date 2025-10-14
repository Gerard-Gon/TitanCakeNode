import React from 'react';
import { render, screen } from '@testing-library/react';
import { SubmitButton } from '../../../components/atoms/SubmitButton';

describe('SubmitButton component', () => {
  it('should render a button with the correct label', () => {
    render(<SubmitButton label="Enviar" />);
    const button = screen.getByRole('button', { name: 'Enviar' });

    expect(button).toBeTruthy();
    expect(button.tagName).toBe('BUTTON');
    expect(button.textContent).toBe('Enviar');
  });

  it('should have type submit and variant primary', () => {
    render(<SubmitButton label="Guardar" />);
    const button = screen.getByRole('button', { name: 'Guardar' });

    expect(button.getAttribute('type')).toBe('submit');
    expect(button.className).toContain('btn-primary');
  });
});