import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/organisms/footer.css';

function Footer() {
  return (
    <footer className="footer mt-auto py-4">
      <Container>
        <Row>
          <Col md={4} className="footer-section">
            <h5>TitanCake</h5>
            <p>Endulzando tus momentos desde 2025</p>
          </Col>
          <Col md={4} className="footer-section">
            <h5>Enlaces</h5>
            <ul className="list-unstyled">
              <li><a href="/">Inicio</a></li>
              <li><a href="/products">Productos</a></li>
              <li><a href="/contact">Contacto</a></li>
            </ul>
          </Col>
          <Col md={4} className="footer-section">
            <h5>Contacto</h5>
            <p>Email: contacto@titancake.cl</p>
            <p>Tel: +56 9 1234 5678</p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <p className="copyright">&copy; 2025 TitanCake. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;