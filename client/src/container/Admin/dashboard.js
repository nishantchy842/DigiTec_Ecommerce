import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate,useLocation } from "react-router-dom";
import Layout from '../../component/layout/layout';
import useProduct from '../../hooks/useProduct'

const Dashboard = () => {
 const {name,phone,email} = useSelector(state=>state.user)

  return (
    <Layout>
     
        <h1 className='text-center'>Admin Dashboard</h1>
        <div className='text-center h-[70vh] flex justify-center items-center'>
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
