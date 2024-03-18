import { useForm } from "react-hook-form";
import useCategories from "../../CustomHooks/useCategories";
import { Spinner } from "react-bootstrap";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { useEffect } from "react";
import useModal from "../../CustomHooks/useModal";
import { useRef } from "react";


export default function AdminCategoryPage() {

    const { categories, isLoading, handleAdd, handleEdit, handleDelete } = useCategories();

    const { openModal } = useModal();

    const submitRef = useRef();

    const triggerSubmit = () => {
        submitRef.current.submit();
    }

    const addCategory = () => {
        openModal(
            'Add Category',
            <CategoryForm
                ref={submitRef}
                method={handleAdd}
                categories={categories}
            />,
            triggerSubmit
        )
    }

    const editCategory = (category) => {
        openModal(
            'Edit Category',
            <CategoryForm
                ref={submitRef}
                category={category}
                method={(data) => handleEdit(data, category.id)}
            />,
            triggerSubmit
        )
    }

    const deleteCategory = (category) => {
        openModal(
            'Delete Brand',
            `Do you want to delete brand with id: ${category.id}`,
            () => handleDelete(category)
        )
    }

    return (
        <>
            {isLoading ? (
                <div className="w-100 text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <div className="my-5">
                    <h1>Categories</h1>
                    <hr />
                    <i className="btn btn-link bi bi-plus-circle-fill btn btn-link fs-1" onClick={addCategory}></i>
                    <div className="col-6">
                        <ul className="list-group">
                            {categories && categories.map(parent => (
                                <li key={parent.id} className="fw-semibold fs-5 list-group-item">
                                    <div className="d-flex justify-content-between align-items-center my-2">
                                        <span>{parent.name}</span>
                                        <div>
                                            <i className="btn btn-link text-dark bi bi-pencil fs-5" onClick={() => editCategory(parent)}></i>
                                            <i className="btn btn-link text-dark bi bi-trash3-fill fs-5" onClick={() => deleteCategory(parent)}></i>
                                        </div>
                                    </div>
                                    <ul className="fw-normal fs-6 list-group">
                                        {parent.subCategories?.length > 0 && (
                                            parent.subCategories.map(sub => (
                                                <li key={sub.id} className="list-group-item">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span>{sub.name}</span>
                                                        <div>
                                                            <i className="btn btn-link text-dark bi bi-pencil fs-5" onClick={() => editCategory(sub)}></i>
                                                            <i className="btn btn-link text-dark bi bi-trash3-fill fs-5" onClick={() => deleteCategory(sub)}></i>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}

const CategoryForm = forwardRef(({ category, categories, method }, ref) => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    useImperativeHandle(ref, () => ({
        submit: handleSubmit(method)
    }))

    useEffect(() => {
        category ? reset({ name: category.name }) : reset();
    }, [category])

    return (
        <form noValidate>
            <div className="mb-3">
                <label htmlFor="name" className="fw-semibold">Name:</label>
                <input
                    type="text"
                    className='form-control w-50'
                    id="name"
                    {...register('name', { required: true })}
                />
                <p className="text-danger">{errors.name?.message}</p>
            </div>
            {!category && (
                <div className="mb-3">
                    <label htmlFor="parentCat" className="fw-semibold">Parent Category:</label>
                    <select
                        className="form-select"
                        id="parentCat"
                        {...register('parentCat', { required: true })}

                    >
                        <option value={0}>- As parent Category -</option>
                        {categories && categories.map(cat => (
                            <option value={cat.id} key={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <p className="text-danger">{errors.name?.message}</p>
                </div>
            )}
        </form>
    )
});

CategoryForm.displayName = 'CategoryForm';
