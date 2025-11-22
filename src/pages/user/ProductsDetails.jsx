import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import products from '../../data/products.js';
import Image from '../../components/atoms/Image.jsx';
import Text from '../../components/atoms/Text.jsx';
import Button from '../../components/atoms/Button.jsx';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/productsdetails.css'
import CardBody from '../../components/molecules/CardBody.jsx';

const image = {
    src: 'https://i.pinimg.com/originals/4b/21/22/4b2122e5164f6a736b0f6fdaa02a8bd9.gif',
    alt: 'Not Found Image',
}


function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <Container className="my-5">
        <h2 className='titulo'>Producto no encontrado!</h2>
        <p className='texto'>no indages más</p>
        <Image src={image.src} alt={image.alt} className="" />        
      </Container>
    );
  }

  return (
    <Container className="centrador">
    <Button variant="info" onClick={() => navigate(`/products`)}>
      Volver
    </Button>
    <Card  className="m-2 marron">
      <Image src={product.image} alt={product.name} className="card-img-top-products-detail" />
      <Card.Body className='texto-producto'>
        <CardBody
          title={product.name}
          description={product.description}
        />
      </Card.Body>
    </Card>
    </Container>
  );
}

export default ProductDetail;