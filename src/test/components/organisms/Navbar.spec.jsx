import React from 'react';
import { render, screen, act } from '@testing-library/react';
import NavBar from '../../../components/organisms/Navbar';
import { MemoryRouter } from 'react-router-dom';

describe('NavBar component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render the brand and navigation links', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText('TitanCake')).toBeTruthy();
    expect(screen.getByText('Inicio')).toBeTruthy();
    expect(screen.getByText('Productos')).toBeTruthy();
    expect(screen.getByText('Contacto')).toBeTruthy();
  });

  it('should render cart and session icons', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Carrito')).toBeTruthy();
    expect(screen.getByAltText('Sesion')).toBeTruthy();
  });

  it('should show cart count if items exist in localStorage', () => {
    const mockCart = [
      { id: 1, name: 'Pastel', quantity: 2 },
      { id: 2, name: 'Torta', quantity: 3 },
    ];
    localStorage.setItem('cart', JSON.stringify(mockCart));

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText('5')).toBeTruthy(); // 2 + 3
  });

  it('should update cart count when cartUpdated event is dispatched', () => {
    const initialCart = [{ id: 1, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(initialCart));

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText('1')).toBeTruthy();

    const updatedCart = [
      { id: 1, quantity: 1 },
      { id: 2, quantity: 2 },
    ];
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    act(() => {
      window.dispatchEvent(new Event('cartUpdated'));
    });

    expect(screen.getByText('3')).toBeTruthy(); // 1 + 2
  });
});