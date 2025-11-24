import axios from 'axios';

const BASE_URL = 'https://titancakebackend.onrender.com/api/v1/usuarios';

class UserService {

    login(usuario) {
        return axios.post(`${BASE_URL}/login`, usuario);
    }

    createUser(usuario){
        return axios.post(BASE_URL, usuario);
    }

    getAllUsuarios() {
        return axios.get(BASE_URL);
    }

    deleteUsuario(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }

    getUsuarioById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    updateUsuario(id, data) {
        return axios.put(`${BASE_URL}/${id}`, data);
    }

    updateUsuario(id, data) {
        return axios.patch(`${BASE_URL}/${id}`, data);
    }
}

export default new UserService();