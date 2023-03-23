import React, { useEffect, useState } from 'react'
import CategoryForm from '../../component/Form/categoryForm';
import Layout from '../../component/layout/layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name)
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/category/add-category`, {
              name,
            });
            if (data?.success) {
              toast.success(`${name} is created`,);
              getAllCategory();
              setName('')
            } else {
              toast.error(data.message);
            }
          } catch (error) {
            console.log(error);
            // toast.error("somthing went wrong in input form");
          }

    }
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
    return (
        <Layout title={"Dashboard - Create Category"}>
        <div className='flex justify-left'>
        <button onClick={()=>navigate('/')} className='rounded hover:rounded-lg shadow md:shadow-lg p-2'>Back</button>
        </div>
            <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
            />
            {
                categories?.map((item)=>{
                    return <li key={item._id}>{item.name}</li>
                })
            }
        </Layout>
    )
}

export default AddCategory
