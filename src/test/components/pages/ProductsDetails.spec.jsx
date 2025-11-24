import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'; 
import ProductDetail from '../../../pages/user/ProductsDetails'; 
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductosService from '../../../services/ProductService'; 

describe('ProductDetail component', () => {
  const mockProductData = {
    id: 1,
    nombreProducto: 'Berlin',
    descripcionProducto: 'Delicioso berlin',
    precio: 1200,
    imageUrl: 'berlin.jpg',
    stock: 10
  };

  beforeEach(() => {
    spyOn(ProductosService, 'getProductoById').and.returnValue(Promise.resolve({ data: mockProductData }));
  });

  it('should render product details when product exists', async () => {
    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
        expect(screen.getByText('Berlin')).toBeTruthy();
    });
    
    expect(screen.getByText('Delicioso berlin')).toBeTruthy();
    expect(screen.getByAltText('Berlin')).toBeTruthy();
  });
  
  it('should show not found message when fetch fails', async () => {
    ProductosService.getProductoById.and.returnValue(Promise.reject("Error"));

    render(
      <MemoryRouter initialEntries={['/products/999']}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

     await waitFor(() => {
        expect(screen.getByText('¡Producto no encontrado!')).toBeTruthy();
    });
  });
});