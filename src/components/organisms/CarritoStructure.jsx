import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext'; // Importamos Auth
import { useNavigate } from 'react-router-dom';
import { generarMensaje } from '../../utils/GenerarMensaje';

function CarritoStructure() {
  const [cart, setCart] = useState([]);
  const { user } = useAuth(); // Obtenemos el usuario
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(stored);
  }, []);

  // ... (mantén las funciones updateCart, increment, decrement, remove igual que antes) ...
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };
  
  const increment = (id) => { /* ...código existente... */ 
    const newCart = cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
    updateCart(newCart);
  };
  const decrement = (id) => { /* ...código existente... */ 
    const newCart = cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter(i => i.quantity > 0);
    updateCart(newCart);
  };
  const remove = (id) => { /* ...código existente... */ 
    const newCart = cart.filter(item => item.id !== id);
    updateCart(newCart);
  };
  const handleVaciar = () => { /* ...código existente... */ 
    updateCart([]);
  };

  // --- NUEVA LÓGICA DE PAGO ---
  const handlePagar = () => {
    if (!user) {
        generarMensaje("Debes iniciar sesión para comprar", "warning");
        navigate('/login');
        return;
    }

    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + (item.precio || item.price) * item.quantity, 0);

    // Crear objeto de Orden
    const newOrder = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: cart,
        total: total,
        status: 'paid'
    };

    // Guardar en "Base de datos" (LocalStorage simulado por usuario)
    const existingOrders = JSON.parse(localStorage.getItem(`orders_${user.id}`)) || [];
    existingOrders.push(newOrder);
    localStorage.setItem(`orders_${user.id}`, JSON.stringify(existingOrders));

    generarMensaje("¡Compra realizada con éxito! Revisa tu perfil.", "success");
    
    // Limpiar carrito
    updateCart([]);
    localStorage.removeItem('cart');
    
    // Redirigir al perfil
    setTimeout(() => navigate('/profile'), 1500);
  };

  const total = cart.reduce((sum, item) => sum + (item.precio || item.price) * item.quantity, 0);

  return (
    <div className="container mt-4 centrador" data-testid="carrito-container">
      <h1>Carrito de Compras</h1>
      <br />
      <h2>Resumen de tu pedido: </h2>
      <br />
      {cart.length === 0 ? (
        <p data-testid="carrito-vacio">Tu carrito está vacío.</p>
      ) : (
        <>
          <Table striped bordered hover data-testid="tabla-carrito">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <Button variant="success" size="sm" onClick={() => increment(item.id)}>+</Button>{' '}
                    <Button variant="secondary" size="sm" onClick={() => decrement(item.id)}>-</Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => remove(item.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex gap-2 mb-3">
            <Button variant="success" onClick={handlePagar} data-testid="btn-pagar">
              Pagar
            </Button>
            <Button variant="danger" onClick={handleVaciar} data-testid="btn-vaciar">
              Eliminar todo
            </Button>
          </div>

          <h4 data-testid="total-carrito">Total: ${total.toLocaleString('es-CL')}</h4>
        </>
      )}
    </div>
  );
}

export default CarritoStructure;