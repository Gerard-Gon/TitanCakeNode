import React from 'react';
import { render, screen } from '@testing-library/react';
import Carrito from '../../../pages/user/Carrito'; 
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/AuthContext';

describe('Carrito component', () => {
  it('should render CarritoStructure inside the container', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
           <Carrito />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Carrito de Compras')).toBeTruthy();
  });
});