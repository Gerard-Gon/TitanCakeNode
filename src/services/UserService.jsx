import axios from 'axios';

const BASE_URL = 'https://titancakebackend.onrender.com/api/v1/usuarios';

class UserService {
    login(usuario) { return axios.post(`${BASE_URL}/login`, usuario); }
    
    createUser(usuario){ return axios.post(BASE_URL, usuario); }
    
    getAllUsuarios() { return axios.get(BASE_URL); }

    // Método necesario para cargar los datos en el formulario de edición
    getUsuarioById(id) { return axios.get(`${BASE_URL}/${id}`); }

    // Método necesario para guardar los cambios
    updateUsuario(id, usuario) { return axios.put(`${BASE_URL}/${id}`, usuario); }

    deleteUsuario(id) { return axios.delete(`${BASE_URL}/${id}`); }
}

export default new UserService();