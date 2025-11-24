import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import ProductosService from '../../../services/ProductService';
import { generarMensaje } from '../../../utils/GenerarMensaje';
import Input from '../../../components/atoms/Input';
import Button from '../../../components/atoms/Button';
import InputFile from '../../../components/atoms/InputFile'; 
import { uploadToImgBB } from '../../../utils/uploadImage';
import '../../../styles/pages/login.css'; 

function ProductForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        nombreProducto: '',
        descripcionProducto: '',
        precio: '',
        stock: '',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false); 
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            ProductosService.getProductoById(id)
                .then(res => {
                    const prod = res.data;
                    setFormData({
                        nombreProducto: prod.nombreProducto,
                        descripcionProducto: prod.descripcionProducto,
                        precio: prod.precio,
                        stock: prod.stock,
                        imageUrl: prod.imageUrl
                    });
                    setPreview(prod.imageUrl);
                })
                .catch(err => {
                    generarMensaje("Error cargando el pastel", "error");
                    navigate('/admin/productos');
                })
                .finally(() => setLoading(false));
        }
    }, [id, isEditing, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if(!file) return;

        setUploading(true);
        try {
            const { url, preview: localPreview } = await uploadToImgBB(file);
            setFormData(prev => ({ ...prev, imageUrl: url }));
            setPreview(localPreview);
            generarMensaje("Imagen cargada correctamente", "success");
        } catch (error) {
            console.error(error);
            generarMensaje("Error al subir imagen a ImgBB", "error");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.imageUrl) {
            generarMensaje("Por favor sube una imagen del pastel", "warning");
            return;
        }

        setLoading(true);
        const payload = {
            ...formData,
            precio: parseInt(formData.precio),
            stock: parseInt(formData.stock),
            categoria: { id: 1 }
        };

        try {
            if (isEditing) {
                await ProductosService.updateProducto(id, payload);
                generarMensaje("¡Pastel actualizado!", "success");
            } else {
                await ProductosService.createProducto(payload);
                generarMensaje("¡Nuevo pastel creado!", "success");
            }
            navigate('/admin/productos');
        } catch (error) {
            generarMensaje("Error al guardar", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <div className="login-wrapper">
            <div className="login-container" style={{ maxWidth: '600px', height: 'auto' }}> 
                
                <h1 className="form-title text-center mb-4">
                    {isEditing ? 'Editar Pastel' : 'Nuevo Pastel'}
                </h1>

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    
                    <div className="mb-2 text-center">
                        <InputFile 
                            onChange={handleImageUpload} 
                            disabled={uploading}
                            preview={preview}
                            className="bg-light text-dark rounded" 
                        />
                        {uploading && <span className="text-warning mt-2 d-block">Subiendo imagen...</span>}
                    </div>
                    <Input 
                        name="nombreProducto" 
                        placeholder="Nombre del Pastel" 
                        value={formData.nombreProducto} 
                        onChange={handleChange} 
                        required 
                        className="login-input"
                    />

                    <Input 
                        type="textarea"
                        name="descripcionProducto" 
                        placeholder="Descripción deliciosa..." 
                        value={formData.descripcionProducto} 
                        onChange={handleChange} 
                        required 
                        className="login-input"
                        style={{ minHeight: '100px' }}
                    />

                    <div className="row g-2">
                        <div className="col-6">
                            <Input 
                                type="number"
                                name="precio" 
                                placeholder="Precio ($)" 
                                value={formData.precio} 
                                onChange={handleChange} 
                                required 
                                className="login-input"
                            />
                        </div>
                        <div className="col-6">
                            <Input 
                                type="number"
                                name="stock" 
                                placeholder="Stock" 
                                value={formData.stock} 
                                onChange={handleChange} 
                                required 
                                className="login-input"
                            />
                        </div>
                    </div>

                    <div className="d-flex gap-3 mt-4">
                        <Button 
                            type="button" 
                            onClick={() => navigate('/admin/productos')}
                            className="login-btn w-50"
                            style={{ fontSize: '24px', backgroundColor: '#8d6e63', color: 'white', borderColor: 'white' }}
                        >
                            Cancelar
                        </Button>
                        
                        <Button 
                            type="submit" 
                            disabled={loading || uploading}
                            className="login-btn w-50"
                        >
                            {loading ? <Spinner size="sm" /> : (isEditing ? 'Guardar' : 'Crear')}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default ProductForm;