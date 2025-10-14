import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useParams,useNavigate } from 'react-router-dom';
import recetas from '../data/recetas.js';
import Image from '../components/atoms/Image.jsx';
import Text from '../components/atoms/Text.jsx';
import rat from '../img/rata.webp';
import '../styles/organisms/recetasdetails.css'




const image = {
    src: rat,
    alt: 'Not Found Image',
}

function RecetasDetail() {
  const { id } = useParams();
  const recetaSeleccionada = recetas.find((p) => p.id === parseInt(id));
  const navigate = useNavigate();

  if (!recetaSeleccionada) {
    return (
      <Container className="my-5">
        <h2 className='titulo'>Receta no encontrada!</h2>
        <p className='texto'>no indages más</p>
        <Image src={image.src} alt={image.alt} className="" />        
      </Container>
    );
  }

  return (
    <Container className="centrador">
    <Button variant="info" onClick={() => navigate(`/Blog`)}>
        Volver
    </Button>      
    <Card className="m-2 marron">
      <Image src={recetaSeleccionada.image} alt={recetaSeleccionada.name} className="card-img-top-details" />
      <Card.Body>
          <Text variant="h2">{recetaSeleccionada.name}</Text>
          <Text variant="p">{recetaSeleccionada.ingrediente}</Text>
          <Text variant="p">{recetaSeleccionada.metodo}</Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RecetasDetail;
