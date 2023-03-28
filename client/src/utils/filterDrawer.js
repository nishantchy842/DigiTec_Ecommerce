import React, { useEffect, useState } from 'react';
import useCategory from '../hooks/useCategory'
import useProducts from '../hooks/useProduct'

import { Checkbox, Layout, Space } from 'antd';
import axios from 'axios';
const { Sider } = Layout;

const siderStyle = {
  textAlign: 'center',
  minHeight: '80vh',
  minWidth: '220px',
  color: 'black',
};

const FilterByCatergory = () => {
  const categories = useCategory()
  const products = useProducts()
  const [checked, setChecked] = useState([]);
  const [product, setProduct] = useState([]);

  
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  // useEffect(() => {
  //   products()
  // }, []);



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
  useEffect(() => {
    checked.length && filterProduct();
  }, [checked]);

  return (
    <Space
      direction="vertical"
      size={[0, 48]}
    >

      <Sider style={siderStyle}>
        <h1 className='text-center font-bold text-xl'>Filter By Category</h1>
        <div>
        {
          categories.map((item,id)=>{
            return (
              <div key={id}>
              <Checkbox onChange={(e) => handleFilter(e.target.checked, item._id)}>{item.name}</Checkbox>
              </div>
            )
          })
        }

        </div>
      </Sider>

    </Space>
  )
}
export default FilterByCatergory;