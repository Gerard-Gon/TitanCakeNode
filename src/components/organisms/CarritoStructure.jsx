import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

function CarritoStructure() {
  const [cart, setCart] = useState([]);

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
    const newCart = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(newCart);
  };

  const decrement = (id) => {
    const newCart = cart
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);
    updateCart(newCart);
  };

  const remove = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    updateCart(newCart);
  };

  const handlePagar = () => {
    alert('¡Gracias por su compra!');
    updateCart([]);
    localStorage.removeItem('cart');
  };

  const handleVaciar = () => {
    alert('Se eliminaron todos los productos del carrito');
    updateCart([]);
    localStorage.removeItem('cart');
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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