import { Container, Row, Col } from 'react-bootstrap';
import products from '../data/products';
import ProductCard from '../components/organisms/ProductCard';
import '../styles/pages/products.css'



function Products() {
 return (
  <div className='centrador'>
    <Container className="my-5">
      <h1 className="subtitulo centrador">Productos</h1>
        <Row>
          {products.map((product) => (
            <Col key={product.id} md={6} lg={3} className='d-flex'>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
    </Container>
   </div>
 );
}


export default Products;