import React from 'react';
import { render, screen } from '@testing-library/react';
import RecetasDetail from '../../../pages/RecetasDetail';
import recetas from '../../../data/recetas';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('RecetasDetail component', () => {
  it('should render receta details when receta exists', () => {
    const receta = recetas[0];

    render(
      <MemoryRouter initialEntries={[`/blog/${receta.id}`]}>
        <Routes>
          <Route path="/blog/:id" element={<RecetasDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(receta.name)).toBeTruthy();
    expect(screen.getByText(receta.ingrediente)).toBeTruthy();
    expect(screen.getByText(receta.metodo)).toBeTruthy();
    expect(screen.getByAltText(receta.name)).toBeTruthy();
    expect(screen.getByText('Volver')).toBeTruthy();
  });

  it('should show not found message when receta does not exist', () => {
    render(
      <MemoryRouter initialEntries={['/blog/999999']}>
        <Routes>
          <Route path="/blog/:id" element={<RecetasDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Receta no encontrada!')).toBeTruthy();
    expect(screen.getByText('no indages más')).toBeTruthy();
    expect(screen.getByAltText('Not Found Image')).toBeTruthy();
  });
});