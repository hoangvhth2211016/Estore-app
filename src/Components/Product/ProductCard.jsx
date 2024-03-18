import { useNavigate } from "react-router-dom";


export default function ProductCard({ product }) {

    let navigate = useNavigate();

    const toProductDetail = (productId) => {
        navigate(`/products/${productId}`);
    }

    return (
        <div className="card" onClick={() => toProductDetail(product.id)}>
            <div className="ratio ratio-1x1">
                <img
                    className="object-fit-cover"
                    src={product.productImages.length === 0 ? '/product-image-placeholder.png' : product.productImages[0].url}
                    alt={product.title}
                />
            </div>
            <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.category.name}</p>
                </div>
                <p className="fw-semibold fs-5">{product.price} $</p>
            </div>
        </div>
    )
}
