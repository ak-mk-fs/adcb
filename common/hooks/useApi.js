import {useState, useEffect, useRef, useCallback} from "react";
const PER_PAGE = 10;

const useApi = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchRecords = useCallback(async ()=>{
        if(loading)  return;
        setLoading(true);
        try{
            const res = await fetch(`https://dummyjson.com/products?skip=${(page - 1)*PER_PAGE}&limit=${PER_PAGE}`);
            const data = await res.json()
            setList((prev)=> [...prev, ...data.products]);
            setHasMore(list.length !== data.total);
            setPage((prev) => prev + 1);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }, [page, loading]);

    return {list, fetchRecords, loading, hasMore}
};

export default useApi;