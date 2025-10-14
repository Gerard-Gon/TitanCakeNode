import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductDetail from '../../../pages/ProductsDetails';
import products from '../../../data/products';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('ProductDetail component', () => {
  it('should render product details when product exists', () => {
    const product = products[0];

    render(
      <MemoryRouter initialEntries={[`/products/${product.id}`]}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(product.name)).toBeTruthy();
    expect(screen.getByText(product.description)).toBeTruthy();
    expect(screen.getByAltText(product.name)).toBeTruthy();
    expect(screen.getByText('Volver')).toBeTruthy();
  });

  it('should show not found message when product does not exist', () => {
    render(
      <MemoryRouter initialEntries={['/products/999999']}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Producto no encontrado!')).toBeTruthy();
    expect(screen.getByText('no indages más')).toBeTruthy();
    expect(screen.getByAltText('Not Found Image')).toBeTruthy();
  });
});