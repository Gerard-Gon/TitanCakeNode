import React from 'react';
import { render, screen } from '@testing-library/react';
import Products from '../../../pages/Products';
import products from '../../../data/products';
import { MemoryRouter } from 'react-router-dom';

describe('Products component', () => {
  it('should render the title and all product cards', () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );

    // Verifica el título principal
    expect(screen.getByText('Productos')).toBeTruthy();

    // Verifica que cada producto se renderice
    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeTruthy();
    });
  });
});