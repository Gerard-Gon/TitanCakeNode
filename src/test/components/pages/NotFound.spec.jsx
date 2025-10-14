import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../../../pages/NotFound';
import { MemoryRouter } from 'react-router-dom';

describe('NotFound component', () => {
  it('should render the error title, message, and image', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText(/PAGINA NO ENCONTRADA/i)).toBeTruthy();
    expect(screen.getByText(/NANOMACHINES SON/i)).toBeTruthy();
    expect(screen.getByAltText('Not Found Image')).toBeTruthy();
  });
});