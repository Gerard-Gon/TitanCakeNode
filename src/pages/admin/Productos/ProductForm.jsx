import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductosService from '../../../services/ProductService';
import { generarMensaje } from '../../../utils/GenerarMensaje';
import Input from '../../../components/atoms/Input';
import Button from '../../../components/atoms/Button';
import InputFile from '../../../components/atoms/InputFile'; // Asegúrate de tener este componente
import { uploadToImgBB } from '../../../utils/uploadImage'; // Tu utilidad de subida

function ProductForm() {
    const navigate = useNavigate();
    const { id } = useParams(); // Si hay ID, es edición. Si no, es creación.
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        nombreProducto: '',
        descripcionProducto: '',
        precio: '',
        stock: '',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    // Cargar datos si estamos editando
    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            ProductosService.getProductoById(id)
                .then(response => {
                    const prod = response.data;
                    setFormData({
                        nombreProducto: prod.nombreProducto,
                        descripcionProducto: prod.descripcionProducto,
                        precio: prod.precio,
                        stock: prod.stock,
                        imageUrl: prod.imageUrl
                    });
                    setImagePreview(prod.imageUrl);
                })
                .catch(error => {
                    console.error(error);
                    generarMensaje("Error al cargar el producto", "error");
                    navigate('/admin/productos');
                })
                .finally(() => setLoading(false));
        }
    }, [id, isEditing, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            generarMensaje("Error al subir la imagen", "error");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dataToSend = {
                ...formData,
                precio: parseInt(formData.precio),
                stock: parseInt(formData.stock),
                categoria: { id: 1 } // Ajusta esto según tu lógica de categorías
            };

            if (isEditing) {
                await ProductosService.updateProducto(id, dataToSend);
                generarMensaje("¡Producto modificado con éxito!", "success");
            } else {
                await ProductosService.createProducto(dataToSend);
                generarMensaje("¡Producto creado con éxito!", "success");
            }
            
            // Volver a la lista
            navigate('/admin/productos');

        } catch (error) {
            console.error(error);
            generarMensaje("Hubo un error al guardar", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 font-['Cream_Cake']">
                    {isEditing ? `Modificar: ${formData.nombreProducto}` : 'Crear Nuevo Producto'}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Imagen */}
                    <div className="space-y-2">
                        <label className="font-semibold">Imagen del Producto</label>
                        <InputFile onChange={handleImageChange} disabled={uploadingImage} preview={imagePreview} />
                    </div>

                    {/* Campos de Texto */}
                    <Input 
                        name="nombreProducto" 
                        placeholder="Nombre del pastel" 
                        value={formData.nombreProducto} 
                        onChange={handleChange} 
                        required 
                    />
                    <Input 
                        type="textarea" 
                        name="descripcionProducto" 
                        placeholder="Descripción detallada" 
                        value={formData.descripcionProducto} 
                        onChange={handleChange} 
                        required 
                        className="h-32"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input 
                            type="number" 
                            name="precio" 
                            placeholder="Precio ($)" 
                            value={formData.precio} 
                            onChange={handleChange} 
                            required 
                        />
                        <Input 
                            type="number" 
                            name="stock" 
                            placeholder="Stock disponible" 
                            value={formData.stock} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex gap-4 pt-4">
                        <Button 
                            text="Cancelar" 
                            type="button"
                            onClick={() => navigate('/admin/productos')} 
                            className="bg-gray-500 hover:bg-gray-600 text-white flex-1"
                        />
                        <Button 
                            text={loading ? "Guardando..." : "Confirmar"} 
                            type="submit"
                            disabled={loading || uploadingImage}
                            className="bg-green-600 hover:bg-green-700 text-white flex-1"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductForm;