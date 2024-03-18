import { Spinner } from "react-bootstrap";
import useFetch from "../../CustomHooks/useFetch";
import usePagination from "../../CustomHooks/usePagination";
import { getProducts } from "../../Services/product.service";
import ProductsPage from "./ProductsPage";
import { useLocation } from "react-router-dom";
import AdminProductsPage from "./AdminProductsPage";


export default function ProductList() {

    const { searchParams } = usePagination();

    const { data, setData, isLoading } = useFetch(getProducts, { searchParams });

    const location = useLocation();

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
                        <AdminProductsPage data={data} setData={setData} />
                    ) : (
                        <ProductsPage data={data} />
                    )}
                </>
            )}
        </>
    )
}
