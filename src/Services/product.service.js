import api from "../interceptors";

export const getProducts = (params) => {
    return api.get('/products/public', { params: params.searchParams })
        .then(res => res.data);
}

export const getProductById = (productId) => {
    return api.get(`/products/public/${productId}`)
        .then(res => res.data);
}

export const getProductsByIdList = (idList) => {
    return api.get(`/products`, { params: { idList: idList } })
        .then(res => res.data);
}

export const getProductsByFilter = (params) => {
    return api.get('/products/public/filter', {
        params: params.searchParams
    })
        .then(res => res.data);
}

export const searchProduct = (search) => {
    return api.get('/products/search', { params: { ...search } })
        .then(res => res.data);
}

export const addProduct = (productDto) => {
    return api.post('/products', productDto, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const updateProduct = (productDto, productId) => {
    return api.put(`/products/${productId}`, productDto);
}

export const deleteProduct = (productId) => {
    return api.delete(`/products/${productId}`)
        .then(res => {
            console.log(`product with id ${res.data.id} deleted`);
            console.log(res);
        });
}

export const uploadProductImages = (productId, formData) => {
    return api.postForm(`/products/${productId}/images`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
    )
}

export const deleteProductImage = (productId, imageId) => {
    return api.delete(`/products/${productId}/images/${imageId}`);
}

export const getProductReviews = (params) => {
    return api.get(`/products/public/${params.productId}/reviews`, { params: params.searchParams })
        .then(res => res.data);
}

export const postProductReview = (productId, reviewDto) => {
    return api.post(`/products/${productId}/reviews`, reviewDto);
}
