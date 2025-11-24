import React from 'react';
import { render, screen } from '@testing-library/react';
import CardBody from '../../../components/molecules/CardBody';

describe('CardBody component', () => {
  it('should render title and description', () => {
    render(<CardBody title="Torta Selva Negra" description="Bizcocho de chocolate con crema y cerezas" />);
    
    const titleElement = screen.getByText('Torta Selva Negra');
    const descriptionElement = screen.getByText('Bizcocho de chocolate con crema y cerezas');

    expect(titleElement.tagName).toBe('H5');
    expect(descriptionElement.tagName).toBe('P');
  });

  it('should render price when provided', () => {
    render(<CardBody title="Torta" description="Descripción" price={8900} />);
    const priceElement = screen.getByText('$8.900');

    expect(priceElement.tagName).toBe('SPAN');
    expect(priceElement.className).toContain('text-white');
  });

  it('should not render price when undefined', () => {
    render(<CardBody title="Torta" description="Descripción" />);
    const priceElement = screen.queryByText(/\$\d+/);

    expect(priceElement).toBeNull();
  });
});