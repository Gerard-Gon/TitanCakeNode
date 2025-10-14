import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RecetasCard from '../components/organisms/RecetasCard';
import '../styles/pages/products.css';
import recetas from '../data/recetas';

function Blog() {


  return (
    <div className="centrador">
      <Container className="my-5">
        <h1 className="subtitulo centrador" >BLOG</h1>
        <h2 className='subtitulo'>Nuestras recetas mas populares para que puedas hacerlas y disfrutarlas junto a tu familia o amigos</h2>
        <Row>
          {recetas.map((receta) => (
            <Col key={receta.id} md={6} lg={3} className='d-flex'>
              <RecetasCard receta={receta} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Blog;
