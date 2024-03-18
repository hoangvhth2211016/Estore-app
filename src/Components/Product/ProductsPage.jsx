
import CustomPagination from "../Fragments/CustomPagination";
import SearchBar from "../Fragments/SearchBar";
import ProductCard from "./ProductCard";
import SortSelector from "../Fragments/SortSelector";
import ProductFilter from "./ProductFilter";



export default function ProductsPage({ data }) {

    const sortOptions = [
        { value: 'createdAt,ASC', label: 'Oldest' },
        { value: 'updatedAt,DESC', label: 'Lastest' },
        { value: 'price,DESC', label: 'High to low' },
        { value: 'price,ASC', label: 'Low to high' },
        { value: 'title,ASC', label: 'A-Z' },
        { value: 'title,DESC', label: 'Z-A' },
    ]

    const { content: products, totalPages } = data;

    return (
        <div className="my-5 row">
            <div className="col-3 pe-4">
                <h2 className="text-uppercase">filter</h2>
                <ProductFilter />
            </div>
            <div className="col-9">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <SortSelector options={sortOptions} />
                    </div>
                    <div>
                        <SearchBar
                            placeholder="Search by title ..."
                        />
                    </div>
                </div>
                <hr />
                <>
                    {products && (
                        <>
                            <div className="row g-3">
                                {products.length > 0 ? (
                                    <>
                                        {
                                            products.map(p => (
                                                <div className="p-2 col-4" key={p.id}>
                                                    <ProductCard product={p} />
                                                </div>
                                            ))
                                        }
                                    </>
                                ) : (
                                    <h3>No product was found</h3>
                                )}

                            </div>
                            <hr />
                            <CustomPagination total={totalPages} />
                        </>
                    )}
                </>
            </div>
        </div>
    )
}
