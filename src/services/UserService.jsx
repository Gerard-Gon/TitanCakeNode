import axios from 'axios';

// Asegúrate de que esta URL no tenga una barra al final
const BASE_URL = 'https://titancakebackend.onrender.com/api/v1/usuarios';

class UserService {

    // El backend espera un POST en /api/v1/usuarios/login
    // Body: { "correo": "...", "contrasena": "..." }
    login(usuario) {
        return axios.post(`${BASE_URL}/login`, usuario);
    }

    // El backend espera un POST en /api/v1/usuarios
    // Body: { "nombre": "...", "correo": "...", "contrasena": "...", "rol": { "id": ... } }
    createUser(usuario){
        return axios.post(BASE_URL, usuario);
    }

    getAllUsuarios() {
        return axios.get(BASE_URL);
    }

    deleteUsuario(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }
}

export default new UserService();