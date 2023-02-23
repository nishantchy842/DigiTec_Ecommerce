import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
} from 'antd';
import { addProduct } from '../../Redux/reducer/adminSlice';

const { TextArea } = Input;


const AddItems = () => {
const [input,setInput]=useState({})
  const dispatch = useDispatch()
  
  const onFinish = async (value)=>{
    console.log(value)
    dispatch(addProduct(value))
    const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(value)
		}
		const res = await fetch('http://localhost:8000/item', requestOptions)
    const data = await res.json()
		console.log(data)
  }

  return (
    <>
   <div className='h-screen grid place-content-center'>
   <h1 className='text-slate-900 decoration-wavy text-5xl font-sans md:font-serif'>Add Items</h1>
    <div className=' w-screen mt-10'>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 6000 }}
        onFinish={onFinish}
        method="POST"
      >
        <Form.Item label="Title" name={"title"}>
          <Input required />
        </Form.Item>
        <Form.Item label="Price" name={"price"}>
          <InputNumber required />
        </Form.Item>
        <Form.Item label="Quntity" name={"Quntity"}>
        <InputNumber required />
      </Form.Item>
        <Form.Item label="Brand" name={"brand"}>
          <Select>
            <Select.Option value="Dell" key={"dell"}>Dell</Select.Option>
            <Select.Option value="Samsung" key={"Samsung"}>Samsung</Select.Option>
            <Select.Option value="HP"  key={"HP"}>HP</Select.Option>
            <Select.Option value="Asus"  key={"Asus"}>Asus</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Model" name={"model"}>
          <Input />
        </Form.Item>
        <Form.Item label="Categories" name={"categories"}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name={"description"}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Button">
        <Button htmlType='submit' type='primary'className='text-orange-500' >submit</Button>
        </Form.Item>
      </Form>
      </div>
      </div>
    </>
  );
};

export default AddItems