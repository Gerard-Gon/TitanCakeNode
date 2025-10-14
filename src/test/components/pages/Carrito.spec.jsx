import React from 'react';
import { render, screen } from '@testing-library/react';
import Carrito from '../../../pages/Carrito';
import { MemoryRouter } from 'react-router-dom';

describe('Carrito component', () => {
  it('should render CarritoStructure inside the container', () => {
    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    expect(screen.getByText('Carrito de Compras')).toBeTruthy();
  });
});