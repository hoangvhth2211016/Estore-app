import api from "../interceptors";

export const createOrder = (data) => {
    return api.post('/users/orders', data);
}

export const getOrders = (params) => {
    return api.get('/orders', { params: params.searchParams })
        .then(res => res.data);
}

export const getOrderById = (orderId) => {
    return api.get(`/orders/${orderId}`)
        .then(res => res.data);
}

export const getOrderStatus = () => {
    return api.get('/orders/public/status')
        .then(res => res.data);
}
export const updateOrderStatus = (orderId, status) => {
    return api.patch(`/orders/${orderId}`, { status: status });
}
