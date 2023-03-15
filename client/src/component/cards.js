import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
const Cards = () => {
    const [productList , setProductList]=useState([])
    const navigate = useNavigate()
    const fetchProduct = async() =>{
        const res = await axios.get(`http://localhost:8000/api/v1/product/product`)
        // alert(JSON.stringify(res.data.products))
        setProductList(res.data.products)

    }
    useEffect(()=>{
        fetchProduct()
    },[])

    return ( 
        <>
        <div className='flex'>
        {productList.length>0 && productList.map((item)=>{
            return (
                <Card
                style={{
                    width: 300,
                    marginRight:'10px'
                }}
                onClick={()=>navigate('/product',{state:item})}
                hoverable="true"
                key={item._id}
                cover={
                    <img
                        alt="example"
                        src={`http://localhost:8000/api/v1/product/product-photo/${item._id}`}
                    />
                }
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
            <p>Rs.{item.price}</p>
                <Meta
                    title={item.name}
                    description={item.description}
                />
            
            </Card>
            )
        })}
        </div>
            </>
    )
};
export default Cards;