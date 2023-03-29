import React from 'react'
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from '../container/Admin/dashboard';
import Homepage from '../pages/homepage'
import Contact from '../pages/contact'
import Login from '../pages/Auth/login'
import Register from '../pages/Auth/register';
import PageNotFound from '../pages/pageNotFound'
import AddItems from '../container/Admin/addItems';
import Cards from '../component/cards';
import Product from '../pages/product';
import CategoryForm from '../component/Form/categoryForm';
import AddCategory from '../container/Admin/addCategory';
import UpdateProduct from '../container/Admin/updateProduct';
import MyFavProduct from '../pages/myFavProduct';
import UserDashboard from '../pages/Users/userDashboard';
import SearchPage from '../pages/searchPage';



const ConditionalRoutes = () => {
    const { userRole, firstTimeUser, token } = useSelector((state) => state.user);
    if (userRole === "admin") {
        return <AdminRoute />;
    } else if (userRole === "user") {
        return <UserRoutes />;
    } else {
        return <DefaulRoutes />;
    }
}
const DefaulRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/card' element={<Cards /> } />
        <Route path="/product" element={<Product />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/search' element={<SearchPage />} />
      </Routes>
    );
  };
  
  const UserRoutes = () => {
    return (
      <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/card' element={<Cards /> } />
      <Route path="/product/:slug" element={<Product />} />
      <Route path='*' element={<PageNotFound />} />
      <Route path='/liked-product' element={<MyFavProduct />} />
      <Route path='/user/dashboard' element={<UserDashboard />} />
      <Route path='/search' element={<SearchPage />} />
      </Routes>
    );
  };

  const AdminRoute = () => {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/products' element={<Homepage />} />
        <Route path='/product' element={<AddItems /> } />
        <Route path='/product/:slug' element={<UpdateProduct /> } />
        <Route path='/category' element={<AddCategory /> } />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/search' element={<SearchPage />} />

      </Routes>
    );
  };
export default ConditionalRoutes
