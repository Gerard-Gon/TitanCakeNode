import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../components/atoms/ExampleCarouselImage';
import Logo from '../img/Logo.webp'
import { Container } from 'react-bootstrap';
import '../styles/pages/home.css'
 
function Home() {
  return (
    <div class="centrador">
      <Container className="my-5">
        <Carousel>
          <Carousel.Item>
            <ExampleCarouselImage text="First slide" src={Logo} />
            <Carousel.Caption>
              <p className='texto_carrousel'>Desde Arica a Punta arenas.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage text="Second slide" />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage text="Third slide" />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
}

export default Home;