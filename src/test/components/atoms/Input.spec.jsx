import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from '../../../components/atoms/Input';

describe('Input component', () => {
  it('should render a text input by default', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement.tagName).toBe('INPUT');
    expect(inputElement.getAttribute('type')).toBe('text');
  });

  it('should render a textarea when type is "textarea"', () => {
    render(<Input type="textarea" />);
    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement.tagName).toBe('TEXTAREA');
  });

  it('should apply className and placeholder props', () => {
    const testClass = 'form-control-lg';
    const testPlaceholder = 'Escribe tu nombre';

    render(<Input className={testClass} placeholder={testPlaceholder} />);
    const inputElement = screen.getByPlaceholderText(testPlaceholder);

    expect(inputElement.className).toContain('form-control-lg');
    expect(inputElement.getAttribute('placeholder')).toBe(testPlaceholder);
  });

  it('should accept additional props like name and value', () => {
    render(<Input name="email" value="oscar@correo.cl" readOnly />);
    const inputElement = screen.getByDisplayValue('oscar@correo.cl');

    expect(inputElement.getAttribute('name')).toBe('email');
    expect(inputElement.getAttribute('readonly')).toBe('');
  });
});