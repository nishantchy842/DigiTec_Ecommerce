import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const useProducts = () => {
    const [products, setProductList] = useState([]);


    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/product/product`)
            // alert(JSON.stringify(res.data.products))
            if (res.data.success) {
                setProductList(res.data.products);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    }

    useEffect(() => {
        fetchProduct();
    }, []);
    return products
}
export default useProducts
