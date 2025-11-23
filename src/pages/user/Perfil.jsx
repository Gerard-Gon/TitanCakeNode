import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import UserService from '../../services/UserService';
import { generarMensaje } from '../../utils/GenerarMensaje';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import '../../styles/pages/login.css'; 
import '../../styles/pages/admin.css'; 

function UserProfile() {
    const { user, login } = useAuth(); 
    // Solo gestionamos nombre y correo en el estado del formulario
    const [formData, setFormData] = useState({ nombre: '', correo: '' });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                nombre: user.nombre || '',
                correo: user.correo || ''
            });
            // Cargar historial de compras
            const userOrders = JSON.parse(localStorage.getItem(`orders_${user.id}`)) || [];
            setOrders(userOrders);
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Preparamos el payload para PATCH
            // Forzamos el rol: { id: 2 } para asegurar que siga siendo cliente
            const payload = {
                nombre: formData.nombre,
                correo: formData.correo,
                rol: { id: 2 } 
            };

            // Enviamos la actualización (PATCH)
            await UserService.updateUsuario(user.id, payload);
            
            // Actualizamos el contexto de autenticación con los nuevos datos
            // Mantenemos el ID y otros datos que no cambiaron
            const updatedUser = { ...user, ...payload };
            login(updatedUser);

            generarMensaje("¡Perfil actualizado correctamente!", "success");
        } catch (error) {
            console.error(error);
            generarMensaje("Error al actualizar perfil.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="my-5">
            <Row>
                {/* Panel de Edición de Datos */}
                <Col md={5} className="mb-4">
                    <div className="login-container" style={{ padding: '2rem' }}>
                        <h2 className="form-title text-center mb-4" style={{fontSize: '3rem'}}>Mi Perfil</h2>
                        
                        <form onSubmit={handleUpdate} className="d-flex flex-column gap-3">
                            {/* Solo Inputs de Nombre y Correo */}
                            <Input 
                                name="nombre" 
                                placeholder="Nombre Completo" 
                                value={formData.nombre} 
                                onChange={handleChange} 
                                className="login-input"
                                required
                            />
                            <Input 
                                type="email"
                                name="correo" 
                                placeholder="Correo Electrónico" 
                                value={formData.correo} 
                                onChange={handleChange} 
                                className="login-input"
                                required
                            />
                            
                            {/* Botón de actualización */}
                            <Button type="submit" disabled={loading} className="login-btn mt-3">
                                {loading ? <Spinner size="sm" /> : "Guardar Cambios"}
                            </Button>
                        </form>
                    </div>
                </Col>

                {/* Panel de Historial de Compras (Se mantiene igual) */}
                <Col md={7}>
                    <div className="titan-table-container" style={{ backgroundColor: 'rgba(255, 251, 245, 0.9)' }}>
                        <h3 className="titan-subsection-title" style={{ fontSize: '3rem' }}>Mis Compras</h3>
                        {orders.length === 0 ? (
                            <p className="text-center text-muted">No has realizado compras aún.</p>
                        ) : (
                            <Table responsive striped hover className="mt-3">
                                <thead style={{backgroundColor: '#4b2e2e', color: 'white'}}>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Detalle</th>
                                        <th>Total</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, idx) => (
                                        <tr key={idx}>
                                            <td>{new Date(order.date).toLocaleDateString()}</td>
                                            <td>
                                                <ul className="list-unstyled mb-0 small">
                                                    {order.items.map((item, i) => (
                                                        <li key={i}>
                                                            {item.quantity}x {item.nombreProducto || item.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="fw-bold">${order.total?.toLocaleString('es-CL')}</td>
                                            <td><span className="badge bg-success">Pagado</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default UserProfile;