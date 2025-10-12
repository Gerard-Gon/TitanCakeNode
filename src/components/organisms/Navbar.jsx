import { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../../styles/organisms/navbar.css';
import cartIcon from '../../img/cart-icon.png';
import sesionIcon from '../../img/sesion.webp';

function NavBar() {
  const [cartCount, setCartCount] = useState(0);

  const updateCount = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = storedCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  };

  useEffect(() => {
    updateCount(); // Inicial

    // 🔹 Escucha cuando el carrito cambie
    window.addEventListener("cartUpdated", updateCount);

    // Limpieza al desmontar
    return () => {
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, []);

  return (
    <Navbar variant="dark" expand="lg" className='barra'>
      <Container>
        <Navbar.Brand href="/" className='TituloBarra'>TitanCake</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/products">Productos</Nav.Link>
            <Nav.Link href="/nosotros">Sobre Nosotros</Nav.Link>
            <Nav.Link href="/blog">Blog</Nav.Link>
            <Nav.Link href="/carrito">Carrito</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/carrito" style={{ position: 'relative' }}>
              <img
                src={cartIcon}
                alt="Carrito"
                style={{ width: '60px', height: '60px' }}
              />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '0px',
                    right: '5px',
                    backgroundColor: 'red',
                    borderRadius: '50%',
                    padding: '4px 8px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login" style={{ position: 'relative' }}>
              <img
                src={sesionIcon}
                alt="Sesion"
                style={{ width: '60px', height: '60px' }}
              />
            </Nav.Link>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link href="/registro">Registrar Cuenta</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;