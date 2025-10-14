import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import ExampleCarouselImage from '../../../components/atoms/ExampleCarouselImage';

describe('ExampleCarouselImage Component', () => {
  let container;
  let root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    document.body.removeChild(container);
    container = null;
  });

  it('should render an image with correct src and alt attributes', () => {
    const testSrc = 'https://example.com/image.jpg';
    const testAlt = 'Test Image';

    act(() => {
      root.render(<ExampleCarouselImage src={testSrc} alt={testAlt} />);
    });

    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img.src).toContain(testSrc);
    expect(img.alt).toBe(testAlt);
  });

  it('should apply correct inline styles', () => {
    act(() => {
      root.render(<ExampleCarouselImage src="x" alt="y" />);
    });

    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img.style.width).toBe('440px');
    expect(img.style.height).toBe('440px');
    expect(img.style.objectFit).toBe('contain');
    expect(img.style.display).toBe('block');

    // Comparación flexible para evitar errores por '0px auto' vs '0 auto'
    expect(img.style.marginLeft).toBe('auto');
    expect(img.style.marginRight).toBe('auto');
    expect(img.style.marginTop).toBe('0px');
    expect(img.style.marginBottom).toBe('0px');
  });
});