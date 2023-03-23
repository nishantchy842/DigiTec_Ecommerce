import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';
import {decreaseCart, increaseCart} from '../Redux/reducer/countSlice'
const { Meta } = Card;
const Cards = () => {
    const [productList, setProductList] = useState([])
    const [counts,setcount] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const count = useSelector(state=>state.addCart.count)
    const fetchProduct = async () => {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/product/product`)
        // alert(JSON.stringify(res.data.products))
        setProductList(res.data.products)

    }
    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <>
            <div className='flex justify-center flex-wrap shrink'>
                {productList.length > 0 && productList.map((item) => {
                    return (
                        <Card
                            style={{
                                height: '50%',
                                width: 300,
                                marginRight: '10px',
                                marginBottom: '10px'
                            }}
                            hoverable="true"
                            key={item._id}
                            cover={
                                <img
                                    onClick={() => navigate('/product', { state: item })}
                                    alt="example"
                                    src={`${process.env.REACT_APP_BASE_URL}/api/v1/product/product-photo/${item._id}`}
                                />
                            }
                            actions={[
                                <FiMinus key="increase" onClick={()=>dispatch(decreaseCart())}/>,
                                <p>{count}</p>,
                                <FiPlus key="decrease" onClick={()=>dispatch(increaseCart())}/>,
                                <FiShoppingCart />,
                                <FiHeart key="like" />,
                            ]}
                        >
                            <div className='bg-[#f7f7f7] h-[100px] overflow-hidden text-center'
                                onClick={() => navigate('/product', { state: item })}
                            >
                                <p>Rs.{item.price}</p>
                                <Meta
                                    title={item.name}
                                    description={item.description}
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