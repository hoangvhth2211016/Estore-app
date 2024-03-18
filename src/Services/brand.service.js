import api from "../interceptors";

export const getBrands = () => {
    return api.get('/brands/public')
        .then(res => res.data);
}

export const addBrand = (brandDto) => {
    return api.post('/brands', brandDto);
}

export const editBrand = (brandDto, brandId) => {
    return api.patch(`/brands/${brandId}`, brandDto);
}

export const deleteBrand = (brandId) => {
    return api.delete(`/brands/${brandId}`);
}
