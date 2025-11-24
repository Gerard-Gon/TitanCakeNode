import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { generarMensaje } from '../../utils/GenerarMensaje';
import '../../styles/organisms/carrito.css';

function CarritoStructure() {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(stored);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };
  
  const increment = (id) => { 
    const newCart = cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
    updateCart(newCart);
  };

  const decrement = (id) => { 
    const newCart = cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter(i => i.quantity > 0);
    updateCart(newCart);
  };

  const remove = (id) => { 
    const newCart = cart.filter(item => item.id !== id);
    updateCart(newCart);
  };

  const handleVaciar = () => { 
    updateCart([]);
  };

  const handlePagar = () => {
    if (!user) {
        generarMensaje("Debes iniciar sesión para comprar", "warning");
        navigate('/login');
        return;
    }
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => {
        const precioFinal = item.precio || item.price || 0;
        return sum + (precioFinal * item.quantity);
    }, 0);

    const newOrder = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: cart,
        total: total,
        status: 'paid'
    };

    const existingOrders = JSON.parse(localStorage.getItem(`orders_${user.id}`)) || [];
    existingOrders.push(newOrder);
    localStorage.setItem(`orders_${user.id}`, JSON.stringify(existingOrders));

    generarMensaje("¡Compra realizada con éxito! Revisa tu perfil.", "success");
    updateCart([]);
    setTimeout(() => navigate('/profile'), 1500);
  };

  const total = cart.reduce((sum, item) => {
      const precioFinal = item.precio || item.price || 0;
      return sum + (precioFinal * item.quantity);
  }, 0);

  return (
    <div className="carrito-wrapper mt-4">
      <h1 className="carrito-title">Carrito de Compras</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-4">
            <h3>Tu carrito está vacío...</h3>
            <p style={{fontFamily: 'sans-serif', fontSize: '0.9rem'}}>¡Ve a agregar algunos pasteles deliciosos!</p>
            <Button className="btn-titan-success mt-2" onClick={() => navigate('/products')}>
                Ir a Productos
            </Button>
        </div>
      ) : (
        <>
          <h2 className="carrito-subtitle">Resumen de tu pedido:</h2>
          
          <div className="table-responsive rounded-3">
            <table className="titan-table">
                <thead>
                <tr>
                    <th style={{textAlign: 'left', paddingLeft: '20px'}}>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th> {}
                </tr>
                </thead>
                <tbody>
                {cart.map(item => {
                    const nombre = item.nombreProducto || item.name || "Sin nombre";
                    const precio = item.precio || item.price || 0;

                    return (
                        <tr key={item.id}>
                        <td style={{textAlign: 'left', paddingLeft: '20px'}}>
                            <span className="product-name">{nombre}</span>
                        </td>
                        <td>${precio.toLocaleString('es-CL')}</td>
                        <td>
                            <div className="d-flex justify-content-center align-items-center gap-2">
                                <Button variant="secondary" className="btn-action" onClick={() => decrement(item.id)}>-</Button>
                                <span className="fw-bold mx-2">{item.quantity}</span>
                                <Button variant="success" className="btn-action" onClick={() => increment(item.id)}>+</Button>
                            </div>
                        </td>
                        <td className="fw-bold">${(precio * item.quantity).toLocaleString('es-CL')}</td>
                        <td>
                            <Button variant="danger" size="sm" onClick={() => remove(item.id)} style={{fontSize: '0.8rem'}}>
                                Eliminar
                            </Button>
                        </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
          </div>

          <div className="total-display">
             Total: ${total.toLocaleString('es-CL')}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <Button variant="outline-light" size="sm" onClick={handleVaciar}>
              Vaciar Carrito
            </Button>
            <Button className="btn-titan-success" onClick={handlePagar}>
              Pagar Ahora
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default CarritoStructure;