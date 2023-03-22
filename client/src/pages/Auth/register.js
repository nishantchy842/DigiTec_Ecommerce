import { Button, FormControl, FormHelperText, Input, InputLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import Layout from '../../component/layout/layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { setLoginDetails } from '../../Redux/reducer/userSlice'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();





  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8000/api/v1/auth/register', {
        name,
        email,
        password,
        phone,
        address,
      })
      if (res && res.data.success) {
        navigate("/login");
      } else {
        alert.error(res.data.message);
      }

    } catch (error) {
      console.log(error)
    }


  }

  return (
    <Layout title={"Register"}>
      <div className=' h-screen w-auto bg-[#42d1f5] flex justify-center align-middle p-10'>
        <form onSubmit={handleSubmit}>
        <h1 className="title mb-8 ">REGISTER FORM</h1>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Your Address"
              required
            />
          </div>
          <button type="submit" className='bg-cyan-500 hover:bg-cyan-600 p-2'>
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Register
