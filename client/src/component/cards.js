import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';
import { decreaseCart, increaseCart,favProduct } from '../Redux/reducer/countSlice'
import useProducts from '../hooks/useProduct';
const { Meta } = Card;
const Cards = () => {
    const [counts, setcount] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const count = useSelector(state => state.addCart.count)
    const isLike =useSelector(state=>state.addCart.isLike)
  
    const products = useProducts()

    const respectiveProduct=(item,slug)=>{
        navigate(`/product/${slug}`, { state: item })
    }

    return (
        <>
            <div className='flex justify-center flex-wrap shrink'>
                {products.length > 0 && products.map((item) => {
                    return (
                        <Card
                            style={{
                                height:'auto',
                                width: 300,
                                marginRight: '10px',
                                marginBottom: '10px'
                            }}
                            hoverable="true"
                            key={item._id}
                            cover={
                                <img
                                    onClick={() => respectiveProduct(item,item.slug)}
                                    alt="example"
                                    src={`${process.env.REACT_APP_BASE_URL}/api/v1/product/product-photo/${item._id}`}
                                />
                            }
                            actions={[
                                <FiMinus key="increase" onClick={() => dispatch(decreaseCart())} />,
                                <p>{count}</p>,
                                <FiPlus key="decrease" onClick={() => dispatch(increaseCart())} />,
                                <FiShoppingCart  />,
                                <FiHeart key="like" 
                                style={{width:'20px', height:'20px', color:isLike==true? 'red' : 'black' }}
                                onClick={()=>dispatch(favProduct({name:item.name}))}/>,
                            ]}
                        >
                            <div className='bg-[#f7f7f7] h-[100px] overflow-hidden text-center'
                                onClick={() => respectiveProduct(item)}
                            >
                                <p>Rs.{item.price}</p>
                                <Meta
                                    title={item.name}
                                    description={`${item.description.substring(0,50)}.....`}
                                />
                            </div>
                        </Card>
                    )
                })}
            </div>
        </>
    )
};
export default Cards;