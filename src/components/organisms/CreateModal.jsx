import React, { useState, useEffect } from 'react';
import { Modal, Form, Button as BsButton, Spinner } from 'react-bootstrap';
import InputFile from '../atoms/InputFile';
import { uploadToImgBB } from '../../utils/uploadImage';

// Importamos los estilos nuevos
import '../../styles/pages/admin.css'; 

function CreateModal({ isOpen, onClose, onSubmit, inputsConfig = [], title, submitText, loading, initialData = {} }) {
    const [formData, setFormData] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData || {});
            setImagePreview(initialData?.imageUrl || null);
        } else {
            setFormData({});
            setImagePreview(null);
        }
    }, [isOpen, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const { url, preview } = await uploadToImgBB(file);
            setFormData(prev => ({ ...prev, imageUrl: url }));
            setImagePreview(preview);
        } catch (error) {
            alert("Error subiendo imagen: " + error.message);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered size="lg">
            <Modal.Header closeButton className="titan-modal-header">
                <Modal.Title className="titan-modal-title">
                    {title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="titan-modal-body">
                <Form onSubmit={handleSubmit}>
                    {inputsConfig.map((input, index) => {
                        if (input.type === 'file') {
                            return (
                                <Form.Group key={index} className="mb-4">
                                    <Form.Label className="titan-label">Imagen del Pastel</Form.Label>
                                    <InputFile 
                                        onChange={handleImageChange} 
                                        disabled={uploadingImage || loading}
                                        preview={imagePreview} 
                                    />
                                    {uploadingImage && (
                                        <div className="text-center mt-2 text-danger fw-bold">
                                            <Spinner size="sm" animation="border" className="me-2"/>
                                            Subiendo a la nube...
                                        </div>
                                    )}
                                </Form.Group>
                            );
                        }

                        return (
                            <Form.Group key={index} className="mb-3">
                                <Form.Label className="titan-label">
                                    {input.placeholder}
                                </Form.Label>
                                <Form.Control
                                    as={input.type === 'textarea' ? 'textarea' : 'input'}
                                    type={input.type !== 'textarea' ? input.type : undefined}
                                    name={input.name}
                                    value={formData[input.name] || ''}
                                    onChange={handleChange}
                                    required={input.required}
                                    className="titan-input-custom"
                                    style={input.type === 'textarea' ? { minHeight: '100px' } : {}}
                                />
                            </Form.Group>
                        );
                    })}
                </Form>
            </Modal.Body>

            <Modal.Footer className="titan-modal-footer">
                <BsButton variant="secondary" onClick={onClose} disabled={loading}>
                    Cancelar
                </BsButton>
                <BsButton 
                    className="titan-btn-submit"
                    onClick={handleSubmit}
                    disabled={loading || uploadingImage}
                >
                    {loading ? <Spinner size="sm" animation="border" /> : submitText}
                </BsButton>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateModal;