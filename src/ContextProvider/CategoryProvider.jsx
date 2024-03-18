import { useEffect, useState } from "react"
import { createCategory, deleteCategory, editCategory, getCategoriesByParent, handlePath } from "../Services/category.service";
import { CategoriesContext } from "./Context";
import useModal from "../CustomHooks/useModal";
import { toast } from "react-toastify";


export default function CategoryProvider({ children }) {

    const [categories, setCategories] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const { closeModal } = useModal();

    useEffect(() => {
        getCategoriesByParent().then(res => {
            setCategories([...res.data]);
            setIsLoading(false);
        });
    }, []);

    const handleAdd = (categoryDto) => {
        createCategory({
            name: categoryDto.name,
            parentId: categoryDto.parentCat == '0' ? null : Number(categoryDto.parentCat)
        })
            .then(res => {
                const { data } = res;
                setCategories(prev => {
                    if (!data.parentId) {
                        return [...prev, data];
                    } else {
                        const ids = handlePath(data.path);
                        let nextCats = prev;
                        ids.forEach(id => {
                            const cat = nextCats.find(cat => cat.id === id);
                            nextCats = cat.subCategories;
                        });
                        nextCats.push(data);
                        return [...prev];
                    }
                })
                toast.success('Category created');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Unable to create category');
            })
            .finally(() => closeModal());

    };

    const handleEdit = (updateDto, categoryId) => {
        editCategory(updateDto, categoryId)
            .then(res => {
                setCategories(prev => {
                    const ids = handlePath(res.data.path);
                    let nextCats = prev;
                    ids.forEach(id => {
                        const cat = nextCats.find(cat => cat.id === id);
                        nextCats = cat.subCategories;
                    });
                    nextCats.find(cat => cat.id === categoryId).name = res.data.name;
                    return [...prev];
                })
                toast.success('Category updated');
            })
            .catch(e => {
                console.log(e);
                toast.error('Unable to update category');
            })
            .finally(() => closeModal())
    }

    const handleDelete = (category) => {
        deleteCategory(category.id)
            .then(res => {
                setCategories(prev => {
                    const ids = handlePath(category.path);
                    let nextCats = prev;
                    ids.forEach(id => {
                        const cat = nextCats.find(cat => cat.id === id);
                        nextCats = cat.subCategories;
                    });
                    const index = nextCats.findIndex(cat => cat.id === category.id);
                    nextCats.splice(index, 1);
                    return [...prev];
                })
                toast.success('Category deleted');
            })
            .catch(e => {
                console.log(e);
                toast.error('Unable to delete category');
            })
            .finally(() => closeModal())
    }

    return (
        <CategoriesContext.Provider value={{ categories, setCategories, isLoading, handleAdd, handleEdit, handleDelete }}>
            {children}
        </CategoriesContext.Provider>
    )
}
