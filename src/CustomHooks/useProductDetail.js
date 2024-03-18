import { useContext } from "react";
import { ProductDetailContext } from "../ContextProvider/Context";


export default function useProductDetail() {
    return useContext(ProductDetailContext);
}
