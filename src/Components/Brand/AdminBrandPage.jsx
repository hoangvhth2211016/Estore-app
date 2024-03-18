import React from 'react'
import useBrand from '../../CustomHooks/useBrand'
import useModal from '../../CustomHooks/useModal';
import { Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { forwardRef } from 'react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useImperativeHandle } from 'react';
import { useEffect } from 'react';

const schema = yup.object({
    name: yup.string().required()
})

export default function AdminBrandPage() {

    const { brands, isLoading, handleAdd, handleEdit, handleDelete } = useBrand();

    const { openModal } = useModal();

    const submitRef = useRef();

    const triggerSubmit = () => {
        submitRef.current.submit();
    }

    const addBrand = () => {
        openModal(
            'Add Brand',
            <BrandForm
                ref={submitRef}
                method={handleAdd}
            />,
            triggerSubmit
        )
    }

    const editBrand = (brand) => {
        openModal(
            'Edit Brand',
            <BrandForm
                ref={submitRef}
                brand={brand}
                method={(data) => handleEdit(data, brand.id)}
            />,
            triggerSubmit
        )
    }

    const deleteBrand = (brand) => {
        openModal(
            'Delete Brand',
            `Do you want to delete brand with id: ${brand.id}`,
            () => handleDelete(brand.id)
        )
    }

    return (
        <div className='my-5'>
            <h1>Brands</h1>
            <hr />
            {isLoading ? (
                <div className="w-100 text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <div>
                    <i className="btn btn-link bi bi-plus-circle-fill btn btn-link fs-1" onClick={addBrand}></i>
                    <ul className='list-group col-4 my-3'>
                        {brands.map(brand => (
                            <li key={brand.id} className='list-group-item d-flex justify-content-between align-items-center'>
                                <span>{brand.name}</span>
                                <div>
                                    <i className="btn btn-link text-dark bi bi-pencil fs-5" onClick={() => editBrand(brand)}></i>
                                    <i className="btn btn-link text-dark bi bi-trash3-fill fs-5" onClick={() => deleteBrand(brand)}></i>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}


const BrandForm = forwardRef(({ brand, method }, ref) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useImperativeHandle(ref, () => ({
        submit: handleSubmit(method)
    }))

    useEffect(() => {
        brand ? reset({ name: brand.name }) : reset()
    }, [brand])

    return (
        <form className='mb-3' noValidate>
            <div className="mb-3">
                <label htmlFor="name" className="fw-semibold">Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    {...register('name')}
                />
                {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </div>
        </form>
    )
});

BrandForm.displayName = 'BrandForm';
