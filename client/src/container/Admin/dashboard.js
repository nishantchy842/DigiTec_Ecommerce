import React from 'react'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigation = useNavigate()
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={()=>navigation('/product')}>Add Product</button>
    </div>
  )
}

export default Dashboard
