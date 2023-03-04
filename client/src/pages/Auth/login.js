import React, { useState } from 'react'
import Layout from '../../component/layout/layout'
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const [email , setEmail] = useState('')
const [password , setPassword] = useState('')
const navigate = useNavigate()

  const onFinish = async (values) => {
    console.log(password);
    console.log(email);
    
try{
  const res = await axios.post('http://localhost:8000/api/v1/auth/login',{
    email,
    password
  })
  if (res && res.data.success) {
    navigate("/");
  } else {
    alert.error(res.data.message);
  }
}catch(error){
  console.log(error)
}
   

  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Layout title={'Login'}>
    <div className='flex justify-center items-center min-h-[79vh] bg-slate-400'>
      <Form className='border-2 w-[40%] p-4'
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          label="email"
          name="email"
          value = {email}
          onChange={(e)=>setEmail(e.target.value)}
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          value = {password}
          onChange={(e)=>setPassword(e.target.value)}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
    </Layout>
  )
}

export default Login
