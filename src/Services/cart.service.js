import api from "../interceptors";

export const getCart = () => {
    return api.get('/users/carts')
        .then(res => res.data);
}

export const removeFromCart = (productId) => {
    return api.patch('/users/carts', { productId: productId });
}

export const updateCart = (cartDto) => {
    return api.post('/users/carts', cartDto);
}

export const clearCart = () => {
    return api.delete('/users/carts');
}
