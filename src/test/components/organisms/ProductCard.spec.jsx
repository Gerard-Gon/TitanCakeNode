import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../../components/organisms/ProductCard';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';

describe('ProductCard component', () => {
  const mockProduct = {
    id: 1,
    name: 'Torta de Chocolate',
    price: '$5.990',
    image: 'test.jpg',
  };

  beforeEach(() => {
    localStorage.clear();
    spyOn(window, 'dispatchEvent').and.callThrough();
  });

  it('should render product image, name and price', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Torta de Chocolate')).toBeTruthy();
    expect(screen.getByText('Torta de Chocolate')).toBeTruthy();
    expect(screen.getByText((text) => text.includes('$5.990'))).toBeTruthy();
  });

  it('should navigate to product detail page on "Ver detalles" click', () => {
    function LocationDisplay() {
      const location = useLocation();
      return <div data-testid="location">{location.pathname}</div>;
    }

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ProductCard product={mockProduct} />} />
          <Route path="/products/:id" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Ver detalles'));
    expect(screen.getByTestId('location').textContent).toBe('/products/1');
  });

  it('should add product to cart and dispatch cartUpdated event', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Agregar al carrito'));

    const cart = JSON.parse(localStorage.getItem('cart'));
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe(1);
    expect(cart[0].quantity).toBe(1);
    expect(window.dispatchEvent).toHaveBeenCalledWith(new Event('cartUpdated'));
  });

  it('should increment quantity if product already exists in cart', () => {
    const existingCart = [{ ...mockProduct, quantity: 2 }];
    localStorage.setItem('cart', JSON.stringify(existingCart));

    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Agregar al carrito'));

    const updatedCart = JSON.parse(localStorage.getItem('cart'));
    expect(updatedCart[0].quantity).toBe(3);
  });
});