import { useContext } from 'react'
import { CategoriesContext } from '../ContextProvider/Context';


export default function useCategories() {
    return useContext(CategoriesContext);
}
