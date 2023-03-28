import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const useCategory = () => {
    const [categories, setCategories] = useState([]);


    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/category/category-list`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);
  return  categories
}
export default useCategory
