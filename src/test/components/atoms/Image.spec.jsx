import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image';

describe('Image component', () => {
  it('should render an img element', () => {
    render(<Image src="test.jpg" alt="Test image" className="img-fluid" />);
    const imgElement = screen.getByRole('img');
    expect(imgElement.tagName).toBe('IMG');
  });

  it('should apply the correct src, alt and className props', () => {
    const testSrc = 'cake.jpg';
    const testAlt = 'Delicious cake';
    const testClass = 'rounded shadow';

    render(<Image src={testSrc} alt={testAlt} className={testClass} />);
    const imgElement = screen.getByRole('img');

    expect(imgElement.getAttribute('src')).toBe(testSrc);
    expect(imgElement.getAttribute('alt')).toBe(testAlt);
    expect(imgElement.className).toContain('rounded');
    expect(imgElement.className).toContain('shadow');
  });

  it('should render with empty props without crashing', () => {
    render(<Image />);
    const imgElement = screen.getByRole('img');
    expect(imgElement.tagName).toBe('IMG');
    expect(imgElement.getAttribute('src')).toBeNull();
    expect(imgElement.getAttribute('alt')).toBeNull();
  });
});