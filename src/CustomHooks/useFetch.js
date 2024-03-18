import { useEffect, useState } from "react"

export default function useFetch(fetchFn, params) {

    const [data, setData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = () => {
            fetchFn(params).then(res => {
                setData(res);
                setIsLoading(false);
            });
        }
        getData();
    }, [params?.searchParams]);
    return { data, setData, isLoading };
}
