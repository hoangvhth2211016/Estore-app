import usePagination from "../../CustomHooks/usePagination"

export default function SortButton({ field }) {

    const { sortByField } = usePagination();

    return (
        <i
            className="bi bi-arrow-down-up"
            onClick={() => sortByField(field)}
            style={{ cursor: 'pointer' }}
        >
        </i>
    )
}
