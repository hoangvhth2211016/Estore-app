import { useState } from "react";
import { Carousel } from "react-bootstrap";
import useCart from "../../CustomHooks/useCart";
import ProductReview from "./ProductReview";


export default function ProductDetailPage({ product }) {

    return (
        <div>
            <div className="row my-5">
                <div className="col-6">
                    {product.productImages.length === 0 ? (
                        <div className="ratio ratio-4x3">
                            <img className="object-fit-contain"
                                src="/product-image-placeholder.png"
                                alt="placeholder"
                            />
                        </div>
                    ) : (
                        <Carousel>
                            {product.productImages.map(img => (
                                <Carousel.Item key={img.id}>
                                    <div className="ratio ratio-4x3">
                                        <img className="object-fit-contain" src={img.url} alt={img.name} />
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    )}
                </div>

                <div className="col-6 px-5">
                    <h1>{product.brand.name} - {product.title}</h1>
                    <p><span className="fw-semibold">Category:</span> {product.category.name}</p>
                    <hr className="w-25" />
                    <h5>${product.price}</h5>
                    <p>{product.description}</p>
                    <QtyInput product={product} />
                </div>

                <div className="my-5">
                    <ProductReview productId={product.id} />
                </div>
            </div>
        </div >
    )
}


const QtyInput = ({ product }) => {

    const { handleUpdateCart } = useCart();

    const [quantity, setQuantity] = useState({
        num: null,
        err: null,
        stock: product.stock
    });

    const handleQuantity = (e) => {
        const value = Number(e.target.value);
        if (value <= 0) {
            setQuantity(prev => ({
                ...prev,
                err: 'invalid input'
            }));
        } else if (value > quantity.stock) {
            setQuantity(prev => ({
                ...prev,
                err: 'not enough in stock'
            }))
        } else {
            setQuantity(prev => ({
                ...prev,
                num: value,
                err: null
            }))
        }
    }

    const handleCart = () => {
        if (!quantity.num && !quantity.err) {
            handleUpdateCart(product.id, 1);
        } else if (quantity.num && !quantity.err) {
            handleUpdateCart(product.id, quantity.num);
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between">
                <label htmlFor="qty" className="fw-semibold">Quantity</label>
                <div className="text-end">
                    <input
                        type="number"
                        id="qty"
                        name="qty"
                        defaultValue={quantity.num ? quantity.num : 1}
                        min={1}
                        max={quantity.stock}
                        onChange={(e) => handleQuantity(e)}
                    />
                </div>
            </div>
            <p className="text-danger">{quantity.err}</p>
            <div>
                <button className="btn btn-primary" onClick={handleCart}>Add to cart</button>
            </div>
        </>
    );
}
