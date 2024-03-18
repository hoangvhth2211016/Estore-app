import usePagination from "../../CustomHooks/usePagination";


export default function SortSelector({ options }) {

    const { sortBySelector } = usePagination();

    return (
        <select
            className="form-select"
            defaultValue={'placeholder'}
            onChange={(e) => sortBySelector(e.target.value)}
        >
            <option value="placeholder" disabled>-- Sort --</option>
            {options && options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    )
}
