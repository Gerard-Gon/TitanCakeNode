import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../../components/organisms/ProductCard';
import "../../styles/pages/products.css";
import ProductosService from "../../services/ProductService.jsx";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    ProductosService.getAllProductos()
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error al obtener productos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='centrador'>
      <Container className="my-5">
        <h1 className="subtitulo centrador">Productos</h1>

        {loading ? (
          <div className="text-center">Cargando productos...</div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.id} md={6} lg={3} className='d-flex'>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Products;