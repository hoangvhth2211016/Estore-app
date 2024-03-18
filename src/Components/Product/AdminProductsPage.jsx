import { Link } from "react-router-dom"
import { deleteProduct } from "../../Services/product.service";
import useModal from "../../CustomHooks/useModal";
import { Dropdown } from "react-bootstrap";
import CustomPagination from "../Fragments/CustomPagination";
import SearchBar from "../Fragments/SearchBar";
import SortButton from "../Fragments/SortButton";
import { toast } from "react-toastify";


export default function AdminProductsPage({ data, setData }) {

    const { content: products, totalPages } = data;

    const { openModal, closeModal } = useModal();

    const handleDelete = (productId, productTitle) => {
        openModal(
            'Delete Product',
            `Are you sure you want to delete product with title ${productTitle}?`,
            () => {
                deleteProduct(productId)
                    .then(() => {
                        toast.success('Product deleted');
                        setData(prev => ({
                            ...prev,
                            content: prev.content?.filter(p => p.id !== productId)
                        }));
                    })
                    .catch((err => {
                        console.log(err.response.data);
                        toast.error('Unable to delete product')
                    }));
                closeModal();
            },
        );
    }

    return (
        <div className="my-5">
            <h1>Products</h1>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <Link to='/admin/products/add'><i className="bi bi-plus-circle-fill btn btn-link fs-1"></i></Link>
                </div>
                <SearchBar />
            </div>
            <div>
                <ProductTable products={products} handleDelete={handleDelete} />
                <CustomPagination total={totalPages} />
            </div>

        </div>
    )
}

const ProductTable = ({ products, handleDelete }) => {

    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID <SortButton field={'id'} /></th>
                        <th>Title <SortButton field={'title'} /></th>
                        <th>Price <SortButton field={'price'} /></th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Stock <SortButton field={'stock'} /></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id} className="align-middle">
                            <td>{p.id}</td>
                            <td>{p.title}</td>
                            <td>{p.price} $</td>
                            <td>{p.brand.name}</td>
                            <td>{p.category.name}</td>
                            <td>{p.stock}</td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary">
                                        Action
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to={`/admin/products/${p.id}/edit`}>
                                            View/Edit
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleDelete(p.id, p.title)}>
                                            Delete
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
        </div>

    )
}
