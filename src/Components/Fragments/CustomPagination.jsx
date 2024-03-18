import { Pagination } from "react-bootstrap"
import usePagination from "../../CustomHooks/usePagination"
import { useMemo } from "react";


export default function CustomPagination({ total }) {

    const { searchParams, toPage, setPageSize } = usePagination();

    const currentPage = Number(searchParams.get('page'));

    const pageList = useMemo(() => {
        return Array.from({ length: total }, (_, i) => i);
    }, [total]);

    return (
        <>
            {
                pageList.length !== 0 && (
                    <div className="my-4 d-flex justify-content-between">
                        <div>
                            <select
                                className="form-select"
                                id="page-size"
                                value={searchParams.get('size')}
                                onChange={e => setPageSize(e.target.value)}
                            >
                                <option value="10">10 items</option>
                                <option value="15">15 items</option>
                                <option value="20">20 items</option>
                                <option value="25">25 items</option>
                            </select>
                        </div>

                        <Pagination>
                            <Pagination.First onClick={() => toPage(0)} />
                            <Pagination.Prev onClick={() => toPage(currentPage - 1)} disabled={currentPage === 0} />
                            {pageList?.map((pageNo, i) => (
                                <Pagination.Item key={i} onClick={() => toPage(pageNo)} active={currentPage === pageNo}>{pageNo + 1}</Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => toPage(currentPage + 1)} disabled={currentPage === pageList.length - 1} />
                            <Pagination.Last onClick={() => toPage(pageList.length)} />
                        </Pagination>
                    </div>
                )
            }
        </>
    )
}
