import axios from "axios";
import { getAuth, isTokenExpired } from "./Services/auth.service";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    paramsSerializer: {
        indexes: null
    }
})

api.interceptors.request.use(
    config => {
        const { accessToken } = getAuth();
        if (accessToken) {
            if (!isTokenExpired(accessToken)) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
