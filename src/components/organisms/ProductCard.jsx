import React from 'react';
import { Card } from 'react-bootstrap';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import CardBody from '../molecules/CardBody';
import { useNavigate } from 'react-router-dom';
import '../../styles/organisms/productscard.css';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <Card style={{ width: '18rem' }} className="m-2 marron">
      <Image src={product.image} alt={product.name} className="card-img-top" />
      <Card.Body className='texto-producto'>
        <CardBody
          title={product.name}
          price={product.price}
        />
        <Button variant="info" onClick={() => navigate(`/products/${product.id}`)}>
          Ver detalles
        </Button>
        <Button variant="light" onClick={addToCart}>
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
