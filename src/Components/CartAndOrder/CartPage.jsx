import { Link, useNavigate } from "react-router-dom";
import useCart from "../../CustomHooks/useCart";
import { useMemo, useState } from "react";
import { getUserProfile } from "../../Services/user.service";
import useFetch from "../../CustomHooks/useFetch";
import InfoBox from "../Client/InfoBox";
import { Spinner } from "react-bootstrap";
import { getProductsByIdList } from "../../Services/product.service";
import { createOrder } from "../../Services/order.service";
import AddressBox from "../Client/AddressBox";
import { toast } from "react-toastify";


export default function CartPage() {

    const { cart, handleRemove, handleUpdateCart } = useCart();

    const [orderAddress, setOrderAddress] = useState({});

    const navigate = useNavigate();

    const { data: user, isLoading } = useFetch(getUserProfile);

    const [err, setErr] = useState(null);

    const checkout = () => {
        if (!orderAddress) {
            setErr('Please give us your address');
        } else if (Object.keys(cart).length === 0) {
            setErr('Cannot check out if there is nothing to check out');
        } else {
            setErr(null);

            createOrder({
                userId: user.id,
                street: orderAddress.street,
                city: orderAddress.city,
                country: orderAddress.country,
                zipcode: orderAddress.zipcode,
            })
                .then(res => {
                    console.log(res);
                    toast.success('Your order has been submitted! Please check your email for confirmation!');
                    navigate('/');
                })
                .catch(err => {
                    console.log(err);
                    toast.error('Unable to create order');
                })
        }
    }

    return (
        <>
            {isLoading ? (
                <div className="w-100 text-center my-5">
                    <Spinner animation="border" />
                </div>
            ) : (
                <>
                    <div className="row">
                        <div className="col-6 p-5">
                            <h1>Info</h1>
                            <InfoBox
                                user={user}
                            />
                        </div>
                        <div className="col-6 p-5">
                            <h1>Address</h1>
                            <AddressBox
                                addresses={user.addresses}
                                setOrderAddress={setOrderAddress}
                                userId={user.id}
                            />
                        </div>
                    </div >
                    <div className="p-5 shadow-sm">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2>My Cart</h2>
                            <Link className="btn btn-primary" to='/products'>continue shopping</Link>
                        </div>
                        {cart && (
                            <CartTable
                                cart={cart}
                                handleRemove={handleRemove}
                                handleUpdateCart={handleUpdateCart}
                            />
                        )}
                    </div>
                    <div className="d-flex justify-content-between my-5">
                        <p className="text-danger">{err}</p>
                        <button className="btn btn-primary" onClick={checkout}>Check out</button>
                    </div>
                </>
            )}
        </ >
    )
}


function CartTable({ cart, handleRemove, handleUpdateCart }) {

    const idList = Object.keys(cart?.products).toString();

    const { data: products, setData: setProducts, isLoading } = useFetch(getProductsByIdList, idList);

    const [err, setErr] = useState(null);

    const removeItem = (productId) => {
        handleRemove(productId);
        setProducts(prev => {
            return prev.filter(product => product.id !== productId);
        });
    }

    const changeQuantity = (e, product) => {
        let value = Number(e.target.value);
        if (value <= 0) {
            value = 0;
            setErr('input invalid');
            handleUpdateCart(product.id, value);
        } else if (value > product.stock) {
            value = product.stock;
            setErr(`Only ${product.stock} items left in stock`)
            handleUpdateCart(product.id, value);
        } else {
            setErr(null);
            handleUpdateCart(product.id, value);
        }
    }

    const totalPrice = useMemo(() => {
        return products?.reduce((total, item) => total + item.price * cart.products[item.id], 0);
    }, [cart, products]);

    return (
        <>
            {isLoading ? (
                <div className="w-100 text-center my-5">
                    <Spinner animation="border" />
                </div>
            ) : (
                <>
                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th className="col-2">Product</th>
                                <th className="col-4"></th>
                                <th className="col-2">Price</th>
                                <th className="col-2">Quantity</th>
                                <th className="col-2">Sub Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.length > 0 &&
                                (
                                    products.map(product => (
                                        <tr key={product.id}>
                                            <td>
                                                <img
                                                    className="img-thumbnail img-fluid"
                                                    src={product.productImages[0]?.url}
                                                    alt={product.title} />
                                            </td>
                                            <td>
                                                <Link className="fw-semibold text-dark" to={`/products/${product.id}`}>{product.title}</Link>
                                                <div className="my-2">
                                                    <span className="text-muted">{product.category.name} </span>
                                                </div>
                                                <button
                                                    className="btn btn-link text-dark"
                                                    onClick={() => removeItem(product.id)}>
                                                    <i className="bi bi-trash3-fill fs-4"></i>
                                                </button>
                                            </td>
                                            <td>
                                                ${product.price}
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    defaultValue={cart.products[product.id]}
                                                    min={1}
                                                    max={product.stock}
                                                    onChange={(e) => changeQuantity(e, product)}
                                                />
                                                <p className="text-danger">{err}</p>
                                            </td>
                                            <td>
                                                ${product.price * cart.products[product.id]}
                                            </td>
                                        </tr>
                                    ))
                                )}
                        </tbody>
                    </table >
                    <div className="row">
                        <div className="col-12 col-md-6 offset-md-6">
                            <div className="d-flex justify-content-between mt-3">
                                <p className="fw-semibold">Total:</p>
                                <h4>${totalPrice}</h4>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>

    )
}
