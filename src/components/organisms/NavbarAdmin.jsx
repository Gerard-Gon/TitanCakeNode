import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap'; // Agregado Button
import { useNavigate } from 'react-router-dom'; // Agregado hook para redirección
import '../../styles/organisms/navbar.css';
import sesionIcon from '../../img/sesion.webp'; // Opcional: Si quieres mantener el icono como avatar

function NavBarAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Limpiar sesión
    localStorage.removeItem('user');
    localStorage.removeItem('usuarioTitanCake');
    
    // 2. Redirigir al login
    navigate('/login');
  };

  return (
    <Navbar variant="dark" expand="lg" className='barra'>
      <Container className='me-auto'>
        <Navbar.Brand href="/admin/HomeAdmin" className='TituloBarra'>TitanCake Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* Enlaces del Administrador */}
          <Nav className="me-auto">
            <Nav.Link href="/admin/productos">Productos</Nav.Link>
            <Nav.Link href="/admin/usuarios">Usuarios</Nav.Link>
          </Nav>

          {/* Sección Derecha */}
          <Nav className="ms-auto align-items-center gap-3">
            
            {/* Opcional: Mostrar el ícono de usuario como "Avatar" estático (sin link) */}
            <div className="d-flex align-items-center">
                <img
                  src={sesionIcon}
                  alt="Admin"
                  style={{ width: '60px', height: '60px' }}
                />
            </div>

            {/* Botón de Logout funcional */}
            <Button 
                variant="danger" 
                onClick={handleLogout} 
                size="sm" 
                className="fw-bold"
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