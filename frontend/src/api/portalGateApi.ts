import { useAuthStore } from '@/auth/store/auth.store';
import axios from 'axios';

export const portalGateApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

portalGateApi.interceptors.request.use((config) => {

    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

portalGateApi.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 401) {
            const logout = useAuthStore.getState().logout;
            logout();

            window.location.href = '/auth';
        }

        return Promise.reject(error);
    }
);