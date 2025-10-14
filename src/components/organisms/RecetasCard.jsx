import React from 'react';
import { Card } from 'react-bootstrap';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import CardBody from '../molecules/CardBody';
import { useNavigate } from 'react-router-dom';
import '../../styles/organisms/recetasCard.css';

function RecetasCard({ receta }) {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem' }} className="m-2 marron">
      <Image src={receta.image} alt={receta.name} className="card-img-top" />
      <Card.Body>
        <CardBody
          title={receta.name}
          description={receta.description}
        />
        <Button variant="light" onClick={() => navigate(`/recetas/${receta.id}`)}>
          Ver receta
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RecetasCard;