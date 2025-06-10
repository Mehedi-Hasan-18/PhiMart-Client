import { useEffect, useState } from "react"
import apiClint from "../services/api-clint"

const useFetchCategory = () =>{
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        apiClint.get('/categories').then(res => setCategories(res.data))
    },[])

    return categories
}

export default useFetchCategory;