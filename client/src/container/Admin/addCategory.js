import React, { useEffect, useState } from 'react'
import CategoryForm from '../../component/Form/categoryForm';
import Layout from '../../component/layout/layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal } from 'antd';


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

        toast.success(`${data.category.name} is created`);
        getAllCategory();
        setName('')
      } else {
        alert.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
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
  //update existing category
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      )
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong")
    }
    setVisible(false)
  }
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/category/delete-category/${pid}`)
      if (data?.success) {
        toast.success(data.message)
        getAllCategory()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("error while deleting category")
    }

  }
  return (
    <Layout title={"Dashboard - Create Category"}>

      <div className='flex justify-left'>
        <button onClick={() => navigate('/')} className='rounded hover:rounded-lg shadow md:shadow-lg p-2'>Back</button>
      </div>
      <CategoryForm
        handleSubmit={handleSubmit}
        value={name}
        setValue={setName}
      />
      <div className="flex justify-center items-center p-10">

        <table className="table-auto border-separate border-spacing-x-6 border-spacing-y-2 border border-slate-500">
          <thead>
            <tr>
              <th>SNo.</th>
              <th>Name</th>
              <th>Update</th>
              <th>Action</th>
            </tr>
          </thead>
          {
            categories?.map((item, id) => {
              return (
                <tbody key={item._id} className="border-separate border border-slate-500 text-center bg-[#f1f1f1]">
                  <tr className="hover:bg-[#a5a5a5] border ">
                    <td>{id}</td>
                    <td>{item.name}</td>
                    <td>
                      <button className="rounded-full border p-1 bg-blue-400"
                        onClick={() => {
                          setVisible(true)
                          setUpdatedName(item.name)
                          setSelected(item)
                        }}
                      >Update</button>
                    </td>
                    <td>
                      <button
                        className="rounded-full border p-1 bg-[#b71111] hover:text-[white]"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              )
            })
          }
        </table>

      </div>
      <Modal
        title="Udate Category"
        onCancel={() => setVisible(false)}
        open={visible}
        footer={null}
      >
        <CategoryForm
          value={updatedName}
          setValue={setUpdatedName}
          handleSubmit={handleUpdate}
        />
      </Modal>
    </Layout>
  )
}

export default AddCategory
