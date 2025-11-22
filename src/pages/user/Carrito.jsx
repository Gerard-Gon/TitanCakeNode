import React from 'react';
import { Container } from 'react-bootstrap';
import CarritoStructure from '../../components/organisms/CarritoStructure';

function Carrito() {
  return (
    <Container className="my-5">
      <div className="centrador">
        <CarritoStructure />
      </div>
    </Container>
  );
}

export default Carrito;