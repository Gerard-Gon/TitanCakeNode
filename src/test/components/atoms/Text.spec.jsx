import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

describe('Text component', () => {
  it('should render a paragraph by default', () => {
    render(<Text>Contenido por defecto</Text>);
    const element = screen.getByText('Contenido por defecto');

    expect(element.tagName).toBe('P');
  });

  it('should render the correct HTML tag based on variant', () => {
    render(<Text variant="h2">Título</Text>);
    const element = screen.getByText('Título');

    expect(element.tagName).toBe('H2');
  });

  it('should apply the provided className', () => {
    render(<Text className="text-muted">Texto con clase</Text>);
    const element = screen.getByText('Texto con clase');

    expect(element.className).toContain('text-muted');
  });

  it('should render children correctly', () => {
    render(<Text variant="span">Texto inline</Text>);
    const element = screen.getByText('Texto inline');

    expect(element).toBeTruthy();
    expect(element.tagName).toBe('SPAN');
  });
});