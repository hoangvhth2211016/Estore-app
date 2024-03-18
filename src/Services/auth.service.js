import jwtDecode from "jwt-decode";
import api from "../interceptors";

export const registerUser = (data) => {
    return api.post('auth/register', data);
}

export const login = (data) => {
    return api.post('/auth/login', data)
        .then(res => res.data);
}

export const refreshToken = (refreshToken) => {
    return api.post('/auth/tokens/refresh', {
        headers: {
            'Authorization': 'Bearer ' + refreshToken
        }
    })
        .then(res => res.data);
}

export const resetPassword = (email) => {
    return api.patch('/auth/password', email);
}

export const activateAccount = (data) => {
    return api.post('/auth/account/activate', data)
        .then(res => res.data);
}

export const getAuth = () => {
    const auth = localStorage.getItem('auth');
    return auth ? JSON.parse(auth) : {};
}

export const decodeToken = (token) => {
    return jwtDecode(token);
}

export const isTokenExpired = (token) => {
    const userPayload = jwtDecode(token);
    const { exp } = userPayload;
    return exp * 1000 < Date.now();
}
