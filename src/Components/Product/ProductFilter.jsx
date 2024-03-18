import { Accordion } from "react-bootstrap"
import useCategories from "../../CustomHooks/useCategories"
import { useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useBrand from "../../CustomHooks/useBrand";


export default function ProductFilter() {

    const { state } = useLocation();

    const { categories } = useCategories();

    const { brands } = useBrand();

    const navigate = useNavigate();

    const [filter, setFilter] = useState({
        categories: [],
        brands: []
    });

    useEffect(() => {
        if (state) setFilter({ ...state });
    }, [])

    const addCatToFilter = (e) => {
        setFilter(prev => {
            if (prev.categories.includes(e.target.value)) {
                const filted = prev.categories.filter(v => v !== e.target.value);
                return { ...prev, categories: filted }
            } else {
                return { ...prev, categories: [...prev.categories, e.target.value] }
            }
        })
    }

    const addBrandToFilter = (e) => {
        setFilter(prev => {
            if (prev.brands.includes(e.target.value)) {
                const filted = prev.brands.filter(v => v !== e.target.value);
                return { ...prev, brands: filted }
            } else {
                return { ...prev, brands: [...prev.brands, e.target.value] }
            }
        })
    }

    const toFilterPage = () => {

        let filterParams = {};
        if (filter.categories.length > 0) {
            filterParams = { ...filterParams, categories: filter.categories.toString() }
        }
        if (filter.brands.length > 0) {
            filterParams = { ...filterParams, brands: filter.brands.toString() }
        }

        navigate({
            pathname: '/products/filter',
            search: createSearchParams(filterParams).toString(),
        }, {
            state: filter
        });

    }

    return (
        <>
            <Accordion alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <span className="text-uppercase fw-medium">categories</span>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="row">
                            {categories && categories.map(parentCat => (
                                <div className="col-6 py-3" key={parentCat.id}>
                                    <h5>{parentCat.name}</h5>
                                    {parentCat.subCategories?.map(cat => (
                                        <div className="form-check" key={cat.id}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={filter.categories.includes(`${cat.id}`)}
                                                value={cat.id}
                                                onChange={addCatToFilter}
                                                id={cat.name}
                                            />
                                            <label className="form-check-label" htmlFor={cat.name}>
                                                {cat.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <span className="text-uppercase fw-medium">brands</span>
                    </Accordion.Header>
                    <Accordion.Body>
                        {brands && brands.map(brand => (
                            <div className="form-check" key={brand.id}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={brand.id}
                                    checked={filter.brands.includes(`${brand.id}`)}
                                    onChange={addBrandToFilter}
                                    id={brand.name}
                                />
                                <label className="form-check-label" htmlFor={brand.name}>
                                    {brand.name}
                                </label>
                            </div>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="text-center my-3">
                <button className="btn btn-primary" onClick={toFilterPage}>Find Products</button>
            </div>
        </>

    )
}
