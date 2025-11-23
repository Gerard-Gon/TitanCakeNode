import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Text from '../../components/atoms/Text.jsx';
import DynamicForm from '../../components/molecules/DynamicForm.jsx';
import Button from '../../components/atoms/Button.jsx';
// CORRECCIÓN: Subimos dos niveles para llegar a styles
import '../../styles/pages/contact.css'; 

function Contact() {
  const initialFormData = {
    name: '',
    email: '',
    mensaje: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const formInputs = [
    {
      id: 'name',
      type: 'text',
      label: 'Nombre',
      placeholder: 'Ingresa tu nombre',
      value: formData.name,
      onChange: (e) => setFormData({ ...formData, name: e.target.value }),
    },
    {
      id: 'email',
      type: 'email',
      label: 'Correo',
      placeholder: 'Ingresa tu correo',
      value: formData.email,
      onChange: (e) => setFormData({ ...formData, email: e.target.value }),
    },
    {
      id: 'mensaje',
      type: 'textarea',
      label: 'Mensaje',
      placeholder: 'Ingrese el mensaje',
      rows: 3,
      value: formData.mensaje,
      onChange: (e) => setFormData({ ...formData, mensaje: e.target.value }),
    },
  ];

  const handleSubmit = () => {
    const { name, email, mensaje } = formData;

    // Validaciones
    if (name.length > 100) {
      alert('El nombre no puede tener más de 100 caracteres.');
      return;
    }

    if (!email.endsWith('@duoc.cl')) {
      alert('El correo debe terminar en @duoc.cl');
      return;
    }

    if (mensaje.length > 500) {
      alert('El mensaje no puede tener más de 500 caracteres.');
      return;
    }

    const message = `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${mensaje}`;
    alert(message);
    handleClear();
  };

  const handleClear = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="login-container centrador login-wrapper">
      <Container className="my-5">
        <Text variant="h1" className="form-title">Contacto</Text>
        <Text variant="p">Llena el formulario para informar el error y contactarte</Text>
        <DynamicForm inputs={formInputs} />
        <div className="mt-3">
          <Button variant="primary" onClick={handleSubmit} className="me-2">
            Enviar
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Limpiar
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Contact;