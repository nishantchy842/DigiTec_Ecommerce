import React, { useEffect, useState } from 'react'
import CategoryForm from '../../component/Form/categoryForm';
import Layout from '../../component/layout/layout'
import axios from 'axios'

const AddCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name)
        try {
            const { data } = await axios.post("http://localhost:8000/api/v1/category/add-category", {
              name,
            });
            if (data?.success) {
              alert(`${name} is created`);
            //   getAllCategory();
            } else {
              alert(data.message);
            }
          } catch (error) {
            console.log(error);
            // toast.error("somthing went wrong in input form");
          }

    }
    const getAllCategory = async () => {
        try {
          const { data } = await axios.get("http://localhost:8000/api/v1/category/category-list");
          if (data?.sucess) {
            setCategories(data?.category);
          }
        } catch (error) {
          console.log(error);
          alert.error("Something wwent wrong in getting catgeory");
        }
      }

      useEffect(() => {
        getAllCategory();
      }, [categories]);
    return (
        <Layout title={"Dashboard - Create Category"}>
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
