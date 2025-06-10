import { useEffect, useState } from "react"
import apiClint from "../services/api-clint";

const useFetchProduct = (currentPage,priceRange,selectedCategory,searchQuery,sortOrder) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] =useState("")
    const [totalPage, setTotalPage] = useState(0)

    useEffect(()=>{
        const fetchProduct = async ()=>{
            setLoading(true)
            const url = `/products/?price__gt=${priceRange[0]}&price__lt=${priceRange[1]}&page=${currentPage}&category_id=${selectedCategory}&search=${searchQuery}&ordering=${sortOrder}`
            try{
                const response = await apiClint.get(url)
                const data = await response.data;

                setProducts(data.results)
                setTotalPage(Math.ceil(data.count / data.results.length))
            }catch(error){
                setError(error.message)
            }finally{
                setLoading(false)
            }
        }
        fetchProduct()
    },[currentPage,priceRange,selectedCategory,searchQuery,sortOrder])

    return {products,loading,error,totalPage};
}

export default useFetchProduct ;