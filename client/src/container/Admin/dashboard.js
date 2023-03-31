import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import Layout from '../../component/layout/layout';
import useProduct from '../../hooks/useProduct'
import { Button } from '@mui/material';
import { assignUserRole, setLoginDetails } from '../../Redux/reducer/userSlice';


const Dashboard = () => {
  const { name, phone, email } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Layout>

      <h1 className='text-center'>Admin Dashboard</h1>
      <div className='text-center h-[70vh] flex flex-col  justify-evenly items-center'>
        <div className=' h-[100px] w-[300px] bg-[#a5a5a5] '>
          <p>Admin Name:- {name}</p>
          <p>Admin Phone No:-{phone}</p>
          <p>Admin email:-{email}</p>
        </div>
    
      </div>
    </Layout>
  )
}

export default Dashboard
