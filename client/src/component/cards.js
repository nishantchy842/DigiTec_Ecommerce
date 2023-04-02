import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';
import { favProduct, removeProduct } from '../Redux/reducer/countSlice'
const { Meta } = Card;
const Cards = ({ item, id }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const [countValue,setCountValue] = useState(0)
    const counts = useSelector(state => state.addCart)
   const countValue = counts.addToCart.map((c,i)=>{
        return c.count
    })
 console.log(countValue)
    const { userRole } = useSelector(state => state.user)

    const respectiveProduct = (item, slug) => {
        navigate(`/product/${slug}`, { state: item })
    }
    const handleCart = (item, id) => {
        dispatch(favProduct(item))
    }

    return (
        <>
            {
                userRole === 'admin' ?
                    <Card
                        style={{
                            height: 'auto',
                            width: 300,
                            marginRight: '10px',
                            marginBottom: '10px'
                        }}
                        hoverable="true"
                        cover={
                            <img
                                onClick={() => respectiveProduct(item, item.slug)}
                                alt="example"
                                src={`${process.env.REACT_APP_BASE_URL}/api/v1/product/product-photo/${item._id}`}
                            />
                        }
                        
                    >
                        <div className='bg-[#f7f7f7] h-[100px] overflow-hidden text-center'
                            onClick={() => respectiveProduct(item)}
                        >
                            <p>Rs.{item.price}</p>
                            <Meta
                                title={item.name}
                                description={`${item.description.substring(0, 50)}.....`}
                            />
                        </div>
                    </Card>
                    :
                    <Card
                        style={{
                            height: 'auto',
                            width: 300,
                            marginRight: '10px',
                            marginBottom: '10px'
                        }}
                        hoverable="true"
                        cover={
                            <img
                                onClick={() => respectiveProduct(item, item.slug)}
                                alt="example"
                                src={`${process.env.REACT_APP_BASE_URL}/api/v1/product/product-photo/${item._id}`}
                            />
                        }
                        actions={[
                            <FiMinus className=' w-14 h-8 ' key="increase" onClick={() => dispatch(removeProduct(item))} />,
                            <FiPlus className=' w-14 h-8 ' key="decrease" onClick={() => handleCart(item, id)} />,
                            <FiShoppingCart className=' w-14 h-8 ' onClick={() => handleCart(item, id)} />,
                        ]}
                    >
                        <div className='bg-[#f7f7f7] h-[100px] overflow-hidden text-center'
                            onClick={() => respectiveProduct(item)}
                        >
                            <p>Rs.{item.price}</p>
                            <Meta
                                title={item.name}
                                description={`${item.description.substring(0, 50)}.....`}
                            />
                        </div>
                    </Card>
            }

        </>
    )
};
export default Cards;