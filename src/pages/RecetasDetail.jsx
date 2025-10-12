import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import recetas from '../data/recetas.js';
import Image from '../components/atoms/Image.jsx';
import Text from '../components/atoms/Text.jsx';

const image = {
    src: 'https://i.pinimg.com/originals/4b/21/22/4b2122e5164f6a736b0f6fdaa02a8bd9.gif',
    alt: 'Not Found Image',
}

function RecetasDetail() {
  const { id } = useParams();
  const recetaSeleccionada = recetas.find((p) => p.id === parseInt(id));

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
    <Container className="my-5">
      <Card>
        <Image src={recetaSeleccionada.image} alt={recetaSeleccionada.name} className="card-img-top" />
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
