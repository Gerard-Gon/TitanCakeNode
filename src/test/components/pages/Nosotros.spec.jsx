import React from 'react';
import { render, screen } from '@testing-library/react';
import Nosotros from '../../../pages/Nosotros';
import { MemoryRouter } from 'react-router-dom';


describe('Nosotros component', () => {
  it('should render the title and NosotrosCard', () => {
    render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>
    );

    expect(screen.getByText('Sobre Nosotros')).toBeTruthy();


  });
});