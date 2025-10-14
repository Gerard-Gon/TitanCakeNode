import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../../components/atoms/ExampleCarouselImage';
import Foto1 from '../../img/Logo.webp';
import Foto2 from '../../img/Tres-Leches-2024.webp';
import Foto3 from '../../img/dulce1.webp';
import { Container } from 'react-bootstrap';
import '../../styles/pages/home.css';

function Carrousel() {
  return (
    <div className="centrador" data-testid="carrousel">
      <Container className="my-5">
        <Carousel>
          <Carousel.Item>
            <ExampleCarouselImage text="First slide" src={Foto1} className="imagencarrousel" />
            <Carousel.Caption>
              <p className='texto_carrousel'>Desde Arica a Punta arenas.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage text="Second slide" src={Foto2} className="imagencarrousel" />
            <Carousel.Caption>
            
              <p className='texto_carrousel'>Pasteles de los mas variado</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage text="Third slide" src={Foto3} className="imagencarrousel" />
            <Carousel.Caption>
              <p className='texto_carrousel'> Y en la facilidad de un CLICK</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
}
  export default Carrousel;