import React, { useState } from 'react'
import { useEffect } from 'react';
import { addBrand, deleteBrand, getBrands, editBrand } from '../Services/brand.service';
import { toast } from 'react-toastify';
import { BrandContext } from './Context';
import useModal from '../CustomHooks/useModal';

export default function BrandProvider({ children }) {

    const [brands, setBrands] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const { closeModal } = useModal();

    useEffect(() => {
        getBrands()
            .then(res => {
                setBrands(res);
                setIsLoading(false);
            })
    }, [])

    const handleAdd = (brandDto) => {
        addBrand(brandDto)
            .then(res => {
                setBrands(prev => ([...brands, res.data]));
                toast.success('Brand created');
            })
            .catch(e => {
                console.log(e);
                toast.error('Unable to create brand');
            })
        closeModal();
    }

    const handleEdit = (brandDto, brandId) => {
        editBrand(brandDto, brandId)
            .then(res => {
                setBrands(prev => {
                    prev = prev.filter(brand => brand.id !== brandId);
                    prev.push(res.data);
                    return prev;
                });
                toast.success('Brand updated');
            })
            .catch(e => {
                console.log(e);
                toast.error('Unable to update brand');
            })
        closeModal();
    }

    const handleDelete = (brandId) => {
        deleteBrand(brandId)
            .then(res => {
                setBrands(prev => prev.filter(brand => brand.id !== brandId));
                toast.success('Brand deleted');
            })
            .catch(e => {
                console.log(e);
                toast.error('Unable to delete brand');
            })
        closeModal();
    }

    return (
        <BrandContext.Provider value={{ brands, setBrands, isLoading, handleAdd, handleEdit, handleDelete }}>
            {children}
        </BrandContext.Provider>
    )
}
