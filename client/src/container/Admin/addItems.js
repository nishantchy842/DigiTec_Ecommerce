import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Upload,
} from 'antd';
import { addProduct } from '../../Redux/reducer/adminSlice';

const { Option } = Select;


const AddItems = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(['phone', 'laptop']);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get all category
  // const getAllCategory = async () => {
  //   try {
  //     const { data } = await axios.get("/api/v1/category/get-category");
  //     if (data?.success) {
  //       setCategories(data?.category);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert.error("Something wwent wrong in getting catgeory");
  //   }
  // };


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
        "http://localhost:8000/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        alert.error(data?.message);
      } else {
        alert.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      alert.error("something went wrong");
    }
  };

  return (
    <>
      <div className="m-3 p-3 bg-slate-400 flex justify-center items-center">
        <div className="grid grid-flow-col bg-orange-700 p-3 w-96 justify-center items-center" >

          <div className="col-md-9 mt-5">
            <h1 className="col-md-9 mb-10 text-center text-2xl font-serif font-semibold text-[#0e0f10] ">Create Product</h1>
            <div className="m-1 border border-sky-500">
              <Select
                // bordered={false}
                placeholder="Select a category"
                size="large"
                // className="mb-3 "
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories.map((c, id) => (
                  <Option key={id} value={id}>
                    {c}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
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
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="write a name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="write a description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3 ">
              <input
                type="number"
                value={price}
                placeholder="write a Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={quantity}
                placeholder="write a quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Select
                bordered={false}
                placeholder="Select Shipping "
                size="large"
                showSearch
                className="form-select mb-3"
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
      </div>
    </>
  );
};

export default AddItems