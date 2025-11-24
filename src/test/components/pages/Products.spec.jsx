import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Products from '../../../pages/user/Products';
import { MemoryRouter } from 'react-router-dom';
import ProductosService from '../../../services/ProductService';

describe('Products component', () => {
  const mockProducts = [
    {
      id: 1,
      nombreProducto: 'Berlin',
      precio: 1200,
      imageUrl: 'berlin.webp'
    },
    {
      id: 2,
      nombreProducto: 'Pastel de Choclo',
      precio: 2500,
      imageUrl: 'pastel.webp'
    }
  ];

  beforeEach(() => {
    spyOn(ProductosService, 'getAllProductos').and.returnValue(Promise.resolve({ data: mockProducts }));
  });

  it('should render the title and all product cards', async () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );

    expect(screen.getByText('Productos')).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText('Berlin')).toBeTruthy();
      expect(screen.getByText('Pastel de Choclo')).toBeTruthy();
    });
  });
});