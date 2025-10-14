import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../../components/organisms/Footer';

describe('Footer component', () => {
  it('should render the brand and slogan', () => {
    render(<Footer />);
    expect(screen.getByText('TitanCake')).toBeTruthy();
    expect(screen.getByText('Endulzando tus momentos desde 2025')).toBeTruthy();
  });

  it('should render all navigation links', () => {
    render(<Footer />);
    expect(screen.getByText('Inicio').getAttribute('href')).toBe('/');
    expect(screen.getByText('Productos').getAttribute('href')).toBe('/products');
    expect(screen.getByText('Sobre Nosotros').getAttribute('href')).toBe('/nosotros');
    expect(screen.getByText('Blog').getAttribute('href')).toBe('/blog');

    const contactoLink = screen.getAllByText('Contacto').find(el => el.tagName === 'A');
    expect(contactoLink.getAttribute('href')).toBe('/contact');
});

  it('should render contact information', () => {
    render(<Footer />);
    expect(screen.getByText('Email: contacto@titancake.cl')).toBeTruthy();
    expect(screen.getByText('Tel: +56 9 1234 5678')).toBeTruthy();
  });

  it('should render copyright notice', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 TitanCake. Todos los derechos reservados./)).toBeTruthy();
  });
});