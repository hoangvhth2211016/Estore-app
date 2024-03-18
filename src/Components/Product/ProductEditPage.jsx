import { Tab, Tabs } from "react-bootstrap";
import ProductForm from "./ProductForm";
import { updateProduct } from "../../Services/product.service";
import { useNavigate } from "react-router-dom";
import ProductImageForm from "./ProductImageForm";
import { toast } from "react-toastify";


export default function ProductEditPage({ product }) {

    const navigate = useNavigate();

    const handleEdit = (data) => {
        updateProduct(data, product.id)
            .then(res => {
                console.log(res);
                toast.success('Product updated');
                navigate('/admin/products');
            })
            .catch(err => {
                console.log(err);
                toast.error('Unable to update product');
            });
    }

    return (
        <div className="my-5">
            <Tabs
                defaultActiveKey="edit"
                id="uncontrolled-tab-example"
                className="mb-3"
                mountOnEnter
            >
                <Tab eventKey="edit" title="Edit Product">
                    <div>
                        <ProductForm submitForm={handleEdit} product={product} />
                    </div>
                </Tab>
                <Tab eventKey="image" title="Image">
                    <ProductImageForm images={product.productImages} productId={product.id} />
                </Tab>
            </Tabs>
        </div>
    )
}
