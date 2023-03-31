import React, { useState } from 'react'
import Layout from '../../component/layout/layout'
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { assignUserRole, setLoginDetails } from '../../Redux/reducer/userSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let { state } = useLocation()
  const onFinish = async (values) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`, {
        email,
        password
      })
      if (res.data.success === true) {
        // if (res.data.user.role === 0) {
          dispatch(assignUserRole('user'))
          dispatch(setLoginDetails({
            id: res.data.user._id,
            token: res.data.token,
            name: res.data.user.name,
            phone: res.data.user.phone,
            email: res.data.user.email,
            address: res.data.user.address,
            role: res.data.user.role
          }
          ))
          toast.success("login successfull")
          if (state?.onSuccessNavigation === '/cart') {
            navigate('/cart')
          } else {
            navigate('/')
          }
        
        //  else if (res.data.user.role === 1) {

        //   dispatch(assignUserRole('admin'))
        //   dispatch(setLoginDetails({
        //     id: res.data.user._id,
        //     token: res.data.token,
        //     name: res.data.user.name,
        //     phone: res.data.user.phone,
        //     email: res.data.user.email
        //   }))
        //   toast.success("login successfull")
        //   navigate("/")
        // }
      } else {
        toast.error(res.data.message)
      }

    } catch (error) {
      toast.error('Some went wrong')
    }


  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Layout title={'Login'}>
      <div className='flex justify-center items-center min-h-[79vh] bg-slate-400'>
        <Form className='border-2 w-[40%] p-4 bg-[#f1f1f1]'
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
            label="Email"
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
            <Button block className='text-[black]' type="primary" htmlType="submit">
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
