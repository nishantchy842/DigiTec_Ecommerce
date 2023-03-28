import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";


import {
  Select,
} from 'antd';
import Layout from '../../component/layout/layout';
import useCategory from '../../hooks/useCategory';

const { Option } = Select;


const AddItems = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // get all category
  const categories = useCategory()

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/create-product`,
        productData
      );
      navigate("/products");
      if (data?.sucess) {
        toast.error(data?.message);

      } else {
        toast("Product Created SSuccessfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <Layout title="Digitec-Add product">
        <div className="min-h-[80vh] flex justify-center items-center" >
          <div className="bg-[#a2ded0] flex flex-col justify-center items-center w-[50%]">
            <h1 className=" m-10 text-center text-2xl font-serif font-semibold text-[#0e0f10] ">Create Product</h1>
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              className=" placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="m-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3 ">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    width={'100px'}
                    height={'100px'}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mb-3 ">
              <input
                type="text"
                value={name}
                placeholder="write a name"
                className='placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 w-[20rem] pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="write a description"
                className="form-control placeholder:italic placeholder:text-slate-400 block bg-white border w-[20rem] border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3 ">
              <input
                type="number"
                value={price}
                placeholder="write a Price"
                className="form-control placeholder:italic placeholder:text-slate-400 block bg-white border w-[20rem] border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={quantity}
                placeholder="write a quantity"
                className="form-control placeholder:italic placeholder:text-slate-400 block bg-white border w-[20rem] border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Select
                bordered={false}
                placeholder="Select Shipping "
                size="large"
                showSearch
                className="form-select mb-3 placeholder:italic placeholder:text-slate-400 block bg-white border w-[20rem] border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleCreate}>
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AddItems