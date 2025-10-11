import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import recetas from '../data/recetas.js';
import Image from '../components/atoms/Image.jsx';
import Text from '../components/atoms/Text.jsx';


function RecetasDetail() {
  const { id } = useParams();
  const recetaSeleccionada = recetas.find((p) => p.id === parseInt(id));

  if (!recetaSeleccionada) {
    return (
      <Container className="my-5">
        <h1>Receta no encontrada</h1>
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
