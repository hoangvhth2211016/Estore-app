import { useEffect, useState } from "react"
import { getProductById } from "../Services/product.service";
import { useParams } from "react-router-dom";
import { ProductDetailContext } from "./Context";


export default function ProductDetailProvider({ children }) {

    const { id } = useParams();

    const [product, setProduct] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getProductById(id)
                .then(res => {
                    setProduct({ ...res });
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, [id]);

    return (
        <ProductDetailContext.Provider value={{ product, isLoading, id }}>
            {children}
        </ProductDetailContext.Provider>
    )
}
