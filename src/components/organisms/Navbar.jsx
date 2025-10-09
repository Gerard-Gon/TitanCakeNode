import { Navbar, Nav, Container } from 'react-bootstrap';
import '../../styles/organisms/navbar.css';


function NavBar() {
 return (
   <Navbar bg="dark" variant="dark" expand="lg" className='Barra'>
     <Container>
       <Navbar.Brand href="/" className='TituloBarra'>TitanCake</Navbar.Brand>
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="me-auto">
           <Nav.Link href="/">Inicio</Nav.Link>
           <Nav.Link href="/products">Productos</Nav.Link>
         </Nav>
       </Navbar.Collapse>
     </Container>
   </Navbar>
 );
}


export default NavBar;