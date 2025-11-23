// src/services/UserService.jsx
import axios from 'axios';

// URL de tu backend local
const BASE_URL = 'https://titancakebackend.onrender.com/api/v1/usuarios';

class UserService {

    // El backend espera POST en /api/v1/usuarios/login
    login(usuario) {
        return axios.post(`${BASE_URL}/login`, usuario);
    }

    // El backend espera POST en /api/v1/usuarios para crear
    createUser(usuario){
        return axios.post(BASE_URL, usuario);
    }

    // Métodos adicionales para el admin (opcional por ahora)
    getAllUsuarios() {
        return axios.get(BASE_URL);
    }

    deleteUsuario(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }
}

export default new UserService();