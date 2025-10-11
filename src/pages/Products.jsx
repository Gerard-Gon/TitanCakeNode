import { Container, Row } from 'react-bootstrap';
import products from '../data/products';
import ProductCard from '../components/organisms/ProductCard';
import '../styles/pages/products.css'


function Products() {
 return (
  <div class="centrador">
    <Container className="my-5">
      <h1 class="subtitulo">Productos</h1>
      <Row>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </Container>
   </div>
 );
}


export default Products;