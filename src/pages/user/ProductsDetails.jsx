import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import ProductosService from '../../services/ProductService'; // Importamos el servicio real
import Image from '../../components/atoms/Image';
import Button from '../../components/atoms/Button';
import CardBody from '../../components/molecules/CardBody';
import { generarMensaje } from '../../utils/GenerarMensaje';
import '../../styles/pages/productsdetails.css';

// Imagen de respaldo para errores
const notFoundImage = {
    src: 'https://media.tenor.com/zGQLL-kwwEoAAAAM/cat-meme-pee.gif',
    alt: 'Not Found Image',
};

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Cargar producto desde el Backend al montar el componente
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductosService.getProductoById(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Error cargando producto:", error);
        generarMensaje("No se pudo cargar el producto", "error");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // 2. Lógica para agregar al carrito (Reutilizada para consistencia)
  const addToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      // Aseguramos guardar precio y nombre correctamente desde el objeto del backend
      cart.push({ 
          ...product, 
          quantity: 1,
          // Aseguramos compatibilidad si el backend usa nombres distintos
          price: product.precio, 
          name: product.nombreProducto
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    // Disparamos el evento para actualizar el número en el Navbar
    window.dispatchEvent(new Event("cartUpdated"));
    generarMensaje("¡Producto agregado al carrito!", "success");
  };

  // 3. Renderizado condicional (Cargando...)
  if (loading) {
    return (
      <Container className="my-5 text-center">
         <Spinner animation="border" variant="light" style={{width: '4rem', height: '4rem', color: '#4b2e2e'}} />
         <p className="mt-3 text-white">Cargando dulzura...</p>
      </Container>
    );
  }

  // 4. Renderizado condicional (No encontrado)
  if (!product) {
    return (
      <Container className="my-5 centrador">
        <h2 className='titulo text-center'>¡Producto no encontrado!</h2>
        <p className='texto text-center'>Parece que este pastel se lo comieron...</p>
        <Image src={notFoundImage.src} alt={notFoundImage.alt} className="rounded shadow-lg" />
        <Button variant="info" onClick={() => navigate('/products')} className="mt-4">
            Volver al menú
        </Button>
      </Container>
    );
  }

  // 5. Renderizado del Detalle (Estructura Original Mantenida)
  return (
    <Container className="centrador my-5">
      <div className="d-flex justify-content-start w-100 mb-3" style={{maxWidth: '34rem'}}>
          <Button variant="info" onClick={() => navigate(`/products`)}>
            ← Volver
          </Button>
      </div>

      <Card className="m-2 marron p-3 shadow-lg">
        <Image 
            src={product.imageUrl} 
            alt={product.nombreProducto} 
            className="card-img-top-products-detail rounded" 
        />
        
        <Card.Body className='texto-producto text-center'>
          {/* Reutilizamos CardBody Molecule */}
          <CardBody
            title={product.nombreProducto}
            description={product.descripcionProducto}
            price={product.precio} // Pasamos el precio para que se muestre
          />
          
          <div className="mt-4 d-flex flex-column gap-2">
             {/* Stock Display (Opcional pero útil) */}
             <small className="text-white-50 mb-2">Stock disponible: {product.stock}</small>

             <Button variant="light" onClick={addToCart} className="w-100 py-2 fw-bold fs-5">
                Agregar al carrito 🛒
             </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetail;