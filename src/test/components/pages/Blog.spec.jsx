import React from 'react';
import { render, screen } from '@testing-library/react';
import Blog from '../../../pages/Blog';
import recetas from '../../../data/recetas';
import { MemoryRouter } from 'react-router-dom';

describe('Blog component', () => {
  it('should render the main title and subtitle', () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );

    expect(screen.getByText('BLOG')).toBeTruthy();
    expect(
      screen.getByText(/Nuestras recetas mas populares/i)
    ).toBeTruthy();
  });

  it('should render one RecetasCard per receta', () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );

    recetas.forEach((receta) => {
      expect(screen.getByText(receta.name)).toBeTruthy();
    });
  });
});