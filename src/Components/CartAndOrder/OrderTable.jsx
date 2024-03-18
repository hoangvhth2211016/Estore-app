import { useEffect, useMemo, useState } from "react"
import { Dropdown, Spinner } from "react-bootstrap";
import useModal from "../../CustomHooks/useModal";
import { getUserOrderById, updateUserOrder } from "../../Services/user.service";
import useFetch from "../../CustomHooks/useFetch";
import { getOrderById, getOrderStatus, updateOrderStatus } from "../../Services/order.service";
import CustomDateTime from "../Fragments/CustomDateTime";
import useAuth from "../../CustomHooks/useAuth";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import SortButton from "../Fragments/SortButton";


export default function OrderTable({ orders }) {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Order date <SortButton field={'createdAt'} /></th>
                    <th>Last Update <SortButton field={'updatedAt'} /></th>
                    <th>User</th>
                    <th colSpan={2}>Status</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <OrderRow order={order} key={order.id} />
                ))}
            </tbody>
        </table>
    )
}


const OrderRow = ({ order }) => {

    const location = useLocation();

    const isAdminRoute = location.pathname.includes('admin');

    const [orderState, setOrderState] = useState(order);

    const { openModal, closeModal } = useModal();

    const { auth } = useAuth();

    const [statusOptions, setStatusOption] = useState([]);

    useEffect(() => {
        isAdminRoute && getOrderStatus()
            .then(res => {
                let statusOptions = [];
                res.forEach(e => {
                    statusOptions.push({
                        value: e,
                        label: e.toLowerCase()
                    })
                });
                setStatusOption(statusOptions);
            })
    }, [])

    const viewOrderDetail = () => {
        openModal(
            'Order Detail',
            <OrderDetail
                orderId={orderState.id}
                auth={auth}
            />,
            () => closeModal()
        )
    }

    const cancelOrReturnOrder = (value) => {
        openModal(
            'Cancel Order',
            'Do you really want to cancel this order?',
            () => {
                updateUserOrder(order.id, value)
                    .then(res => {
                        console.log(res);
                        setOrderState({ ...res.data });
                    });
                closeModal();
            }
        );
    }

    const changeOrderStatus = (value) => {
        openModal(
            'Change Order Status',
            'Do you want to change this order status?',
            () => {
                updateOrderStatus(order.id, value)
                    .then(res => {
                        console.log(res);
                        setOrderState({ ...res.data });
                        toast.success('Order status changed');
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error(err.response.data);
                    });
                closeModal();
            }
        )
    }

    const dropdownAction = () => {
        if (isAdminRoute) {
            return;
        }
        switch (order.status) {
            case 'PENDING':
                return <Dropdown.Item
                    onClick={() => cancelOrReturnOrder('CANCEL')}
                >
                    Cancel Order
                </Dropdown.Item>;
            case 'CANCELLED':
                return;
            case 'RETURNED':
                return;
            default:
                return <Dropdown.Item
                    onClick={() => cancelOrReturnOrder('RETURN')}
                >
                    Return Order
                </Dropdown.Item>
        }
    }

    return (
        <tr className="align-middle">
            <td>{orderState.id}</td>
            <td><CustomDateTime dateTime={orderState.createdAt} showDate={true} showTime={true} /></td>
            <td><CustomDateTime dateTime={orderState.updatedAt} showDate={true} showTime={true} /></td>
            <td>{orderState.username}</td>
            <td>
                {isAdminRoute ? (
                    <Select
                        value={statusOptions.find(status => status.value === orderState.status)}
                        options={statusOptions}
                        onChange={option => changeOrderStatus(option.value)}
                    />
                ) : (
                    orderState.status
                )}
            </td>
            <td>
                <Dropdown>
                    <Dropdown.Toggle variant="primary">
                        Action
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={viewOrderDetail}>View Detail</Dropdown.Item>
                        {dropdownAction()}
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    );
}

const OrderDetail = ({ orderId, auth }) => {

    const fetchFn = auth.role === 'CLIENT' ? getUserOrderById : getOrderById;

    const { data, isLoading } = useFetch(fetchFn, orderId);

    const total = useMemo(() => {
        if (data) {
            return data.productsOrders?.reduce((total, item) => total + item.purchasePrice * item.quantity, 0)
        }
        return null;
    }, [data]);

    return (
        <>
            {isLoading ? (
                <div className="w-100 text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <div>
                    <div>
                        <p>
                            <span className="fw-semibold">Order ID: </span>{data.id} <br />
                            <span className="fw-semibold">Order Status: </span>{data.status}<br />
                            <span className="fw-semibold">Created At: </span><CustomDateTime dateTime={data.createdAt} showDate={true} showTime={true} /><br />
                        </p>
                    </div>
                    <div>
                        <h5>User&apos;s information</h5>
                        <div className="row">
                            <div className="col-6">
                                {data.username}<br />
                                {data.firstname}, {data.lastname}<br />
                                {data.email}<br />
                                {data.phone}<br />
                            </div>
                            <div className="col-6">
                                {data.street}<br />
                                {data.zipcode && <span>{data.zipcode}, </span>}{data.city}<br />
                                {data.country}
                            </div>
                        </div>

                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product Name</th>
                                <th>Purchase Price ($)</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.productsOrders.map(item => (
                                <tr key={item.id}>
                                    <td>{item.product.id}</td>
                                    <td>{item.product.brand} {item.product.title}</td>
                                    <td>{item.purchasePrice}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>
                        <span className="fw-semibold">Total:</span> {total}$
                    </p>
                </div>
            )}
        </>

    );
}
