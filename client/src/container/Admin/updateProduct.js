import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";


import {
    Select,
} from 'antd';
import Layout from '../../component/layout/layout';

const { Option } = Select;


const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    //get single product
    const getSingleProduct = async () => {
        try {
            debugger;
            const { data } = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/v1/product/get-product/${params.slug}`
            );
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);

    // get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/category/category-list`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong in getting catgeory");
        }
    };
    useEffect(() => {
        getAllCategory();
    }, []);

    //create product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            debugger;
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category);
            const { data } = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/api/v1/product/update-product/${id}`,
                productData
            );
            if (data?.sucess) {
                toast.error(data?.message);

            } else {
                toast.success("Product Updated Successfully");
                navigate("/products");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };
    //delete product
    const handleDelete = async (e) => {
        try {
            let answer = window.prompt("Are You Sure want to delete this product ? ");
            if (!answer) return;
            const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/product/delete-product/${id}`)
            toast.success("Product DEleted Succfully");
            navigate("/products");
        } catch (error) {
            console.log(error)
            toast.error("something went wrong while deleting")
        }
    }

    return (
        <>
            <Layout title="Digitec-Add product">
                <div className="min-h-[100vh] flex justify-center items-center" >
                    <div className="bg-[#a2ded0] flex flex-col justify-center items-center w-[50%]">
                        <h1 className=" m-10 text-center text-2xl font-serif font-semibold text-[#0e0f10] ">Create Product</h1>
                        <Select
                            bordered={false}
                            placeholder="Select a category"
                            showSearch
                            size="large"
                            className=" placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            onChange={(value) => {
                                setCategory(value);
                            }}
                            value={category}
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
                            {photo ? (
                                <div className="text-center">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="product_photo"
                                        height={"200px"}
                                        className="img img-responsive"
                                    />
                                </div>
                            ) : (
                                <div className="text-center">
                                    <img
                                        src={`${process.env.REACT_APP_BASE_URL}/api/v1/product/product-photo/${id}`}
                                        alt="product_photo"
                                        height={"200px"}
                                        width={"200px"}
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
                                className="form-control h-[80px] placeholder:italic placeholder:text-slate-400 block bg-white border w-[20rem] border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
                                value={shipping ? "yes" : "No"}
                            >
                                <Option value="0">No</Option>
                                <Option value="1">Yes</Option>
                            </Select>
                        </div>
                        <div className="mb-3 bg-[#00b3ff] flex justify-around">
                            <button className="btn btn-primary border p-2" onClick={handleUpdate}>
                                UPDATE PRODUCT
                            </button>
                            <button className="btn btn-primary border p-2" onClick={handleDelete}>
                                DELETE PRODUCT
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default UpdateProduct