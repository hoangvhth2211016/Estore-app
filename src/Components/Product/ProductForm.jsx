import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import useCategories from '../../CustomHooks/useCategories';
import useBrand from '../../CustomHooks/useBrand';


const schema = yup.object({
    title: yup.string().required(),
    brandId: yup.number().required(),
    catId: yup.number().required(),
    description: yup.string().required(),
    price: yup.number().required().positive(),
    stock: yup.number().required().positive(),
})

const status = ['ACTIVE', 'INACTIVE', 'HIDE'];

export default function ProductForm({ product, submitForm }) {

    const { categories } = useCategories();

    const { brands } = useBrand();

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className="mb-3">
                <label htmlFor="title" className="fw-semibold">Title:</label>
                <input
                    type="text"
                    className='form-control w-50'
                    id="title"
                    defaultValue={product ? product.title : ''}
                    {...register('title')}
                />
                <p className="text-danger">{errors.title?.message}</p>
            </div>
            <div className="mb-3">
                <label htmlFor="brand" className="fw-semibold">Brand:</label>
                <select
                    className="form-select w-25"
                    id='brand'
                    defaultValue={product ? product.brand.id : ''}
                    {...register('brandId')}
                >
                    {brands && brands.map(brand => (
                        <option value={brand.id} key={brand.id}>{brand.name}</option>
                    ))}
                </select>
                <p className="text-danger">{errors.title?.message}</p>
            </div>

            <div className="mb-3 row">
                <div className='col-2'>
                    <label htmlFor="category" className="fw-semibold">Category:</label>
                    <select
                        className="form-select"
                        defaultValue={product ? product.category : ''}
                        {...register('catId')}
                    >
                        {categories && categories.map(parentCat => (
                            <optgroup key={parentCat.id} label={parentCat.name} >
                                {parentCat.subCategories.map(cat => (
                                    <option key={cat.id} value={cat.id} >{cat.name}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
                <div className='col-2'>
                    <label htmlFor="price" className="fw-semibold">Price:</label>
                    <input
                        type="number"
                        className='form-control'
                        id='price'
                        step={0.01}
                        min={0}
                        defaultValue={product ? product.price : ''}
                        {...register('price')}
                    />
                    <p className="text-danger">{errors.price?.message}</p>
                </div>
                <div className='col-2'>
                    <label htmlFor="stock" className="fw-semibold">Stock:</label>
                    <input
                        type="number"
                        className='form-control'
                        id='stock'
                        min={0}
                        defaultValue={product ? product.stock : ''}
                        {...register('stock')}
                    />
                    <p className="text-danger">{errors.stock?.message}</p>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="fw-semibold">Description:</label>
                <textarea
                    type="text"
                    className='form-control w-50'
                    id="description"
                    rows={4}
                    defaultValue={product ? product.description : ''}
                    {...register('description')}
                />
                <p className="text-danger">{errors.description?.message}</p>
            </div>
            <div className="mb-3">
                <label htmlFor="status" className="fw-semibold">Status:</label>
                <select
                    className="form-select w-25"
                    id='status'
                    defaultValue={product ? product.status : ''}
                    {...register('status')}
                >
                    {status.map(stat => (
                        <option value={stat} key={stat}>{stat}</option>
                    ))}
                </select>
                <p className="text-danger">{errors.title?.message}</p>
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    )
}
