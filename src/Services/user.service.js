import api from "../interceptors"

export const getUsers = (params) => {
    return api.get('/users', { params: params.searchParams }).then(res => res.data);
}

export const getUserProfile = () => {
    return api.get('/users/profile').then(res => res.data);
}

export const changeUserPassword = (data) => {
    return api.patch('/users/password', data);
}

export const addUserAddress = (data) => {
    return api.post('/users/addresses', data);
}

export const updateUserAddress = (data, addressId) => {
    return api.put(`/users/addresses/${addressId}`, data);
}

export const deleteUserAddress = (addressId) => {
    return api.delete(`/users/addresses/${addressId}`);
}

export const getUserOrders = () => {
    return api.get('/users/orders')
        .then(res => res.data);
}

export const getUserOrderById = (orderId) => {
    return api.get(`users/orders/${orderId}`)
        .then(res => res.data);
}

export const updateUserOrder = (orderId, status) => {
    return api.delete(`/users/orders/${orderId}`, { params: { status: status } });
}

export const uploadAvatar = (image) => {
    return api.post('/users/avatar',
        {
            file: image
        }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
