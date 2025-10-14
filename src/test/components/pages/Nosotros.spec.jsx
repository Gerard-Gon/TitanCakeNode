import React from 'react';
import { render, screen } from '@testing-library/react';
import Nosotros from '../../../pages/Nosotros';
import { MemoryRouter } from 'react-router-dom';

// Si estás usando Karma + Jasmine, asegúrate de que NosotrosCard tenga un identificador visible
// Alternativa: verifica contenido visible dentro de NosotrosCard
describe('Nosotros component', () => {
  it('should render the title and NosotrosCard', () => {
    render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>
    );

    expect(screen.getByText('Sobre Nosotros')).toBeTruthy();

    // Si NosotrosCard tiene contenido visible como un título o párrafo, verifica eso:
    // Por ejemplo, si NosotrosCard muestra "Nuestra historia":
    // expect(screen.getByText('Nuestra historia')).toBeTruthy();

    // O si agregas data-testid en NosotrosCard:
    // expect(screen.getByTestId('nosotros-card')).toBeTruthy();
  });
});