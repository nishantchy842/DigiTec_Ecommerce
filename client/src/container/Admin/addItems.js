import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../../App.css'
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
  
  const onFinish=(value)=>{
    console.log(value)
    dispatch(addProduct(value))
  }

  return (
    <div className='App'>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
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
        <Button htmlType='submit' type='primary' >submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddItems