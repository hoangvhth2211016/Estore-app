import { useForm } from "react-hook-form";
import usePagination from "../../CustomHooks/usePagination";


export default function SearchBar({ placeholder }) {

    const { register, handleSubmit } = useForm();

    const { handleSearch } = usePagination();

    return (
        <form className="d-flex" onSubmit={handleSubmit(handleSearch)}>
            <input
                type="search"
                placeholder={placeholder}
                className="form-control me-2"
                {...register('search')}
            />
            <button className="btn btn-primary">Search</button>
        </form>
    )
}
