import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecetasCard from '../../../components/organisms/RecetasCard';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';

describe('RecetasCard component', () => {
  const mockReceta = {
    id: 42,
    name: 'Pie de Limón',
    description: 'Una receta clásica con base crocante y relleno cítrico.',
    image: 'test.jpg',
  };

  it('should render receta image, name and description', () => {
    render(
      <MemoryRouter>
        <RecetasCard receta={mockReceta} />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Pie de Limón')).toBeTruthy();
    expect(screen.getByText('Pie de Limón')).toBeTruthy();
    expect(screen.getByText(/Una receta clásica/i)).toBeTruthy();
  });

  it('should navigate to receta detail page on "Ver receta" click', () => {
    function LocationDisplay() {
      const location = useLocation();
      return <div data-testid="location">{location.pathname}</div>;
    }

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<RecetasCard receta={mockReceta} />} />
          <Route path="/recetas/:id" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Ver receta'));
    expect(screen.getByTestId('location').textContent).toBe('/recetas/42');
  });
});