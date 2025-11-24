import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import ProductosService from '../../services/ProductService'; 
import Image from '../../components/atoms/Image';
import Button from '../../components/atoms/Button';
import CardBody from '../../components/molecules/CardBody';
import { generarMensaje } from '../../utils/GenerarMensaje';
import '../../styles/pages/productsdetails.css';

const notFoundImage = {
    src: 'https://media.tenor.com/zGQLL-kwwEoAAAAM/cat-meme-pee.gif',
    alt: 'Not Found Image',
};

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const addToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ 
          ...product, 
          quantity: 1,
          price: product.precio, 
          name: product.nombreProducto
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    generarMensaje("¡Producto agregado al carrito!", "success");
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
         <Spinner animation="border" variant="light" style={{width: '4rem', height: '4rem', color: '#4b2e2e'}} />
         <p className="mt-3 text-white">Cargando dulzura...</p>
      </Container>
    );
  }

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
          <CardBody
            title={product.nombreProducto}
            description={product.descripcionProducto}
            price={product.precio} 
          />
          
          <div className="mt-4 d-flex flex-column gap-2">
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