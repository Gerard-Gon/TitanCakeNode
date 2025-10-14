import React from 'react';
import { render, screen } from '@testing-library/react';
import Carrousel from '../../../components/organisms/Carrousel';

const Foto1 = 'logo-mock.webp';
const Foto2 = 'tresleches-mock.webp';
const Foto3 = 'dulce1-mock.webp';

describe('Carrousel component', () => {
  it('should render the carrousel container', () => {
    render(<Carrousel />);
    const carrousel = screen.getByTestId('carrousel');
    expect(carrousel).toBeTruthy();
  });

  it('should render all three carousel items with correct captions', () => {
    render(<Carrousel />);

    expect(screen.getByText('Desde Arica a Punta arenas.')).toBeTruthy();
    expect(screen.getByText('Pasteles de los mas variado')).toBeTruthy();
    expect(screen.getByText('Y en la facilidad de un CLICK')).toBeTruthy();
  });
});