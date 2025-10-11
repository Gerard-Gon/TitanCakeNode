function ExampleCarouselImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: '440px', height: '440px', objectFit: 'contain', display: 'block', margin: '0 auto' }}
    />
  );
}

export default ExampleCarouselImage;