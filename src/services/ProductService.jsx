import axios from "axios";

// URL base de tu API de productos
const API_URL = "http://localhost:3000/api/productos"; 
// ⚠️ Ajusta esta URL según tu backend real

const ProductosService = {
  // Obtener todos los productos
  getAllProductos: () => axios.get(API_URL),

  // Obtener un producto por ID
  getProductoById: (id) => axios.get(`${API_URL}/${id}`),

  // Crear un nuevo producto
  createProducto: (data) => axios.post(API_URL, data),

  // Actualizar un producto existente
  updateProducto: (id, data) => axios.put(`${API_URL}/${id}`, data),

  // Eliminar un producto
  deleteProducto: (id) => axios.delete(`${API_URL}/${id}`)
};

export default ProductosService;