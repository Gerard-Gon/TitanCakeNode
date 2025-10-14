import React from 'react';
import { render, screen } from '@testing-library/react';
import NosotrosCard from '../../../components/organisms/NosotrosCard';
import { MemoryRouter } from 'react-router-dom';

describe('NosotrosCard component', () => {
  it('should render the logo image with correct alt text', () => {
    render(
      <MemoryRouter>
        <NosotrosCard />
      </MemoryRouter>
    );

    expect(screen.getByAltText('logo titancake')).toBeTruthy();
  });

  it('should render the main team description', () => {
    render(
      <MemoryRouter>
        <NosotrosCard />
      </MemoryRouter>
    );

    expect(screen.getByText(/Nuestro equipo titánico/i)).toBeTruthy();
    expect(screen.getByText(/En TitanCake, los pasteles no se hacen por arte de magia/i)).toBeTruthy();
  });

  it('should list all team members by name', () => {
    render(
      <MemoryRouter>
        <NosotrosCard />
      </MemoryRouter>
    );

    expect(screen.getByText(/Gérard González/i)).toBeTruthy();
    expect(screen.getByText(/Oscar Astudillo/i)).toBeTruthy();
    expect(screen.getByText(/Franco Astudillo/i)).toBeTruthy();
  });

  it('should include the final TitanCake experience message', () => {
    render(
      <MemoryRouter>
        <NosotrosCard />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/cada cliente se lleve no solo un pastel, sino una experiencia TitanCake/i)
    ).toBeTruthy();
  });
});