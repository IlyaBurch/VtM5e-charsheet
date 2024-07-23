// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api', // Убедитесь, что это правильный базовый URL для вашего API
    withCredentials: false, // This is the default
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// Авторизация пользователя
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // Получение токена из localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default {
    getFiles() {
        return apiClient.get('/files');
    },
    postFile(file) {
        return apiClient.post('/files', file);
    },
    deleteFile(id) {
        return apiClient.delete(`/files/${id}`);
    }
};
