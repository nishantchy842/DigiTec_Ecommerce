import React from 'react'
import { useNavigate } from "react-router-dom";
import Layout from '../../component/layout/layout';

const Dashboard = () => {
    const navigation = useNavigate()
  return (
    <Layout>
      <h1>Admin Dashboard</h1>
      <button onClick={()=>navigation('/product')}>Add Product</button><br />
      <button onClick={()=>navigation('/category')}>Add category</button>
    </Layout>
  )
}

export default Dashboard
