import { useLocation, useParams } from "react-router-dom";
import useFetch from "../../CustomHooks/useFetch";
import { getProductById } from "../../Services/product.service";
import { Spinner } from "react-bootstrap";
import ProductDetailPage from "./ProductDetailPage";
import ProductEditPage from "./ProductEditPage";


export default function ProductDetail() {

    const { id } = useParams();

    const location = useLocation();

    const { data: product, isLoading } = useFetch(getProductById, id);

    const isAdminRoute = location.pathname.includes('admin');

    return (
        <>
            {isLoading ? (
                <div className="w-100 text-center my-5">
                    <Spinner animation="border" />
                </div>
            ) : (
                <>
                    {isAdminRoute ? (
                        <ProductEditPage product={product} />
                    ) : (
                        <ProductDetailPage product={product} />
                    )}
                </>
            )}
        </>
    )
}
