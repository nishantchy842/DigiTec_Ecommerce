import React, { useState } from 'react'
import Layout from '../../component/layout/layout'
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { assignUserRole, setLoginDetails } from '../../Redux/reducer/userSlice';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    console.log(password);
    console.log(email);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`, {
        email,
        password
      })
      debugger;
      if (res.data.user.role==0) {
        dispatch(assignUserRole('user'))
        dispatch(setLoginDetails())
        navigate("/")
      } else if(res.data.user.role==1) {
        dispatch(assignUserRole('admin'))
        dispatch(setLoginDetails())
        navigate("/")
      }
    } catch (error) {
      alert(error)
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <p className='mt-[15px] text-[12px] text-center'>
          Don't have an account? <Link to="/register" className='font-bold'>Register</Link> 
          </p>
        </Form>
        
      </div>
    </Layout>
  )
}

export default Login
