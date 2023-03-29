import React, { useEffect, useState } from 'react'
import Layout from '../component/layout/layout'
import Cards from '../component/cards'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Checkbox, Layout as layout, Skeleton, Space } from 'antd';
import useCategory from '../hooks/useCategory';
import { Stack } from '@mui/system';
import Pagination from '@mui/material/Pagination';
const { Sider } = layout;
const siderStyle = {
  textAlign: 'center',
  minHeight: '80vh',
  minWidth: '220px',
  color: 'black',
};

const Homepage = () => {
  const categories = useCategory()
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [checked, setChecked] = useState([]);
  const [totalItem, setTotalItem] = useState(0)


  //get products
  const getAllProducts = async (page) => {
    try {
      debugger
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/product/product-list/${page}?size=5`)
      setProduct(data?.products);
      setTotalItem(data?.totalItem)

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getAllProducts('1')
  },[])

  //handle filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length) getAllProducts();
  }, [checked.length]);

  useEffect(() => {
    checked.length && filterProduct();
    //eslint-next-line
  }, [checked]);

  //get filterd product
  const filterProduct = async () => {
    try {

      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/product/product-filters`, {
        checked,
      });
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={'DigiTec'}>
      <div className='flex'>
        <Space
          direction="vertical"
          size={[0, 48]}
        >

          <Sider style={siderStyle}>
            <h1 className='text-center font-bold text-xl'>Filter By Category</h1>
            <div>
              {
                categories.map((item, id) => {
                  return (
                    <div key={id}>
                      <Checkbox
                        onChange={
                          (e) =>
                            handleFilter(e.target.checked, item._id)
                        }>{item.name}</Checkbox>
                    </div>
                  )
                })
              }
            </div>
          </Sider>
        </Space>
        <div className='flex justify-center flex-wrap shrink'>
          {
            product?.map((item, id) => {
              return <Cards key={id} item={item} />
            })
          }
        </div>
      </div>
      <div className='pagination flex justify-end'>
        <Stack spacing={2} >
          <Pagination count={totalItem} onChange={(e)=>getAllProducts(e.target.textContent)} color="primary" />
        </Stack>
      </div>
    </Layout>
  )
}

export default Homepage
