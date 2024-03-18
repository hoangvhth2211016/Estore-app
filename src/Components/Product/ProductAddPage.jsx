
import { useState } from 'react';
import ProductForm from './ProductForm';
import { addProduct } from '../../Services/product.service';
import { Tab, Tabs } from 'react-bootstrap';
import ProductImageForm from './ProductImageForm';
import { toast } from 'react-toastify';


export default function ProductAddPage() {

    const [newProductId, setNewProductId] = useState(null);

    const submitAdd = (data) => {
        console.log(data);
        addProduct(data)
            .then(res => {
                setNewProductId(res.data.id);
                console.log(res);
                toast.success('New Product created!')
            })
            .catch(err => {
                console.log(err);
                toast.error('Unable to create new product!');
            });
    }

    return (
        <div className='my-5'>
            <Tabs
                defaultActiveKey="add"
                id="uncontrolled-tab-example"
                className="mb-3"
                mountOnEnter
            >
                <Tab eventKey="add" title="Add Product">
                    <h1>Add Product</h1>
                    <ProductForm submitForm={submitAdd} />
                </Tab>
                <Tab eventKey="image" title="Image" disabled={!newProductId}>
                    <ProductImageForm productId={newProductId} />
                </Tab>
            </Tabs>
        </div >
    )
}
