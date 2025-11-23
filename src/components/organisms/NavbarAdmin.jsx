// src/components/organisms/NavbarAdmin.jsx
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/organisms/navbar.css';

function NavbarAdmin({ links = [] }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    // Agregamos un borde dorado para diferenciar visualmente el modo admin
    <Navbar variant="dark" expand="lg" className='barra' style={{ borderBottom: '3px solid #FFC107' }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/admin/HomeAdmin" className='TituloBarra'>
          Panel Admin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          
          {/* Sección Dinámica: Renderizado de Links por Props */}
          <Nav className="me-auto">
            {links.map((link, index) => {
                // Filtramos "Salir" si viene en los datos, ya que lo ponemos a la derecha
                if (link.label === 'Salir') return null; 
                return (
                    <Nav.Link key={index} as={NavLink} to={link.to}>
                        {link.label}
                    </Nav.Link>
                );
            })}
          </Nav>

          {/* Sección Derecha: Identidad Admin */}
          <Nav className="ms-auto align-items-center gap-3">
            <span style={{ 
                fontFamily: 'Cream Cake', 
                fontSize: '32px', 
                color: '#FFC107', // Color distintivo para admin
                textShadow: '1px 1px 2px black',
                marginRight: '10px'
            }}>
              user_admin
            </span>
            
            <Button variant="danger" onClick={handleLogout} size="sm" className="fw-bold">
              Cerrar Sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarAdmin;