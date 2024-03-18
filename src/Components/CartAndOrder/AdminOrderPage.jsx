import { Spinner } from "react-bootstrap";
import { getOrders } from "../../Services/order.service";
import CustomPagination from "../Fragments/CustomPagination";
import OrderTable from "./OrderTable";
import useFetch from "../../CustomHooks/useFetch";
import usePagination from "../../CustomHooks/usePagination";


export default function AdminOrderPage() {

    const { searchParams } = usePagination();

    const { data, isLoading } = useFetch(getOrders, { searchParams });

    const { content: orders, totalPages } = { ...data };

    return (
        <>
            {isLoading ? (
                <div className="w-100 text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <div className="my-5">
                    <h1>Orders</h1>
                    <hr />
                    <OrderTable orders={orders} />
                    <CustomPagination total={totalPages} />
                </div>
            )
            }
        </>
    )
}
