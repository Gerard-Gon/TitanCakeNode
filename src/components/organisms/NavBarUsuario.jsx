import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/organisms/navbar.css';
import cartIcon from '../../img/cart-icon.png';
import sesionIcon from '../../img/sesion.webp'; // Usamos el mismo icono para perfil
import { useAuth } from '../../context/AuthContext';

function NavbarUsuario() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  // Lógica del contador del carrito (Reutilizada del Navbar público)
  const updateCount = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = storedCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  };

  useEffect(() => {
    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    return () => window.removeEventListener("cartUpdated", updateCount);
  }, []);

  const handleLogout = () => {
    logout(); // Usamos la función del contexto
    navigate('/login');
  };

  return (
    <Navbar variant="dark" expand="lg" className='barra'>
      <Container className='me-auto'>
        <Navbar.Brand href="/" className='TituloBarra'>TitanCake</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* Enlaces de Cliente */}
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/products">Productos</Nav.Link>
            <Nav.Link href="/contact">Contacto</Nav.Link>
          </Nav>

          <Nav className="ms-auto align-items-center gap-3">
            {/* Carrito con contador */}
            <Nav.Link href="/carrito" style={{ position: 'relative' }}>
              <img src={cartIcon} alt="Carrito" style={{ width: '50px', height: '50px' }} />
              {cartCount > 0 && (
                <span style={{
                    position: 'absolute', top: '0px', right: '5px',
                    backgroundColor: 'red', borderRadius: '50%',
                    padding: '2px 6px', color: 'white', fontSize: '12px', fontWeight: 'bold'
                  }}>
                  {cartCount}
                </span>
              )}
            </Nav.Link>

            {/* Botón Perfil */}
            <Button 
                variant="outline-light"
                onClick={() => navigate('/profile')}
                className="d-flex align-items-center gap-2 border-0"
                style={{ fontFamily: 'Cream Cake', fontSize: '1.5rem', color: '#D7BFAE' }}
            >
                <img src={sesionIcon} alt="Perfil" style={{ width: '40px', height: '40px' }} />
                Hola, {user?.nombre || 'Usuario'}
            </Button>

            {/* Botón Salir (Estilo Admin) */}
            <Button 
                variant="danger" 
                onClick={handleLogout} 
                className="fw-bold px-3 py-2"
                style={{ fontSize: '1rem', letterSpacing: '1px' }}
            >
              Salir
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarUsuario;
