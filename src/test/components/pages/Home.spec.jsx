import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../../pages/user/Home';

describe('Home Page', () => {
  it('renderiza el título Bienvenidos', () => {
    render(<Home />);
    const title = screen.getByText('Bienvenidos');
    expect(title).not.toBeNull(); 
    expect(title.tagName).toBe('H1');
    expect(title.className).toContain('home-welcome-title'); 
  });

  it('renderiza el componente Carrousel con data-testid', () => {
    render(<Home />);
    const carrousel = screen.getByTestId('carrousel');
    expect(carrousel).not.toBeNull();
    expect(carrousel.className).toContain('centrador');
  });

  it('renderiza las imágenes del carrusel', () => {
  render(<Home />);
  const images = screen.getAllByRole('img');
  expect(images.length).toBeGreaterThan(0); 

  images.forEach(img => {
    expect(img).not.toBeNull(); 
    expect(img.getAttribute('src')).not.toBeUndefined();
    expect(img.getAttribute('alt')).not.toBeUndefined();
  });
});


  it('renderiza los textos del carrusel', () => {
    render(<Home />);
    expect(screen.getByText('Desde Arica a Punta arenas.')).not.toBeNull();
    expect(screen.getByText('Pasteles de los mas variado')).not.toBeNull();
    expect(screen.getByText('Y en la facilidad de un CLICK')).not.toBeNull();
  });
});