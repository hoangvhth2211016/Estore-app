import { useLocation, useSearchParams } from "react-router-dom"
import useFetch from "../../CustomHooks/useFetch";
import { getProductsByFilter } from "../../Services/product.service";
import usePagination from "../../CustomHooks/usePagination";
import { Spinner } from "react-bootstrap";
import ProductsPage from "./ProductsPage";


export default function ProductsFilterPage() {

    const { searchParams } = usePagination();

    const { data, isLoading } = useFetch(getProductsByFilter, { searchParams });

    return (
        <>
            {isLoading ? (
                <div className="w-100 text-center my-5">
                    <Spinner animation="border" />
                </div>
            ) : (
                <ProductsPage data={data} />
            )}
        </>
    )
}
