import api from '../interceptors';


export const getCategoriesByParent = () => {
    return api.get('/categories/public');
}

export const createCategory = (categoryDto) => {
    return api.post('/categories', categoryDto);
}

export const editCategory = (updateDto, categoryId) => {
    console.log(updateDto)
    return api.patch(`categories/${categoryId}`, updateDto);
}

export const deleteCategory = (categoryId) => {
    return api.delete(`categories/${categoryId}`);
}

export const handlePath = (path) => {
    if (path.length === 0 || path === null || path === "-") {
        return [];
    }
    return path.split("-").filter(p => p !== "").map(p => Number(p));
}
