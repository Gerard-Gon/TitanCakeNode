import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/organisms/navbar.css';
import sesionIcon from '../../img/sesion.webp';

function NavBarAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('usuarioTitanCake');
    navigate('/login');
  };

  return (
    <Navbar variant="dark" expand="lg" className='barra'>
      <Container className='me-auto'>
        <Navbar.Brand href="/admin/HomeAdmin" className='TituloBarra'>TitanCake Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
            <Nav.Link href="/admin/productos">Productos</Nav.Link>
            <Nav.Link href="/admin/usuarios">Usuarios</Nav.Link>
          </Nav>

          <Nav className="ms-auto align-items-center gap-3">
            
            <div className="d-flex align-items-center">
                <img
                  src={sesionIcon}
                  alt="Admin"
                  style={{ width: '60px', height: '60px' }}
                />
            </div>

            {/* MODIFICADO: Quitamos size="sm" y agregamos padding/font-size */}
            <Button 
                variant="danger" 
                onClick={handleLogout} 
                className="fw-bold px-4 py-2"
                style={{ fontSize: '1.1rem', letterSpacing: '1px' }}
            >
              Cerrar Sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarAdmin;