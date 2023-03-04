import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './container/home';
import AddItems from './container/Admin/addItems';
import Cards from './component/cards';
import Layout from './component/layout/layout'
import Homepage from './pages/homepage';
import PageNotFound from './pages/pageNotFound';
import Contact from './pages/contact';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/contact' element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
    </>
  );
}

export default App;
