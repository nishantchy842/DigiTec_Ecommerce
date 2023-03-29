import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';
import { decreaseCart, increaseCart, } from '../Redux/reducer/countSlice'
const { Meta } = Card;
const Cards = ({ item }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const count = useSelector(state => state.addCart.count)

    const respectiveProduct = (item, slug) => {
        navigate(`/product/${slug}`, { state: item })
    }


    return (
        <>
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
                    <FiMinus key="increase" onClick={() => dispatch(decreaseCart())} />,
                    <p>{count}</p>,
                    <FiPlus key="decrease" onClick={() => dispatch(increaseCart())} />,
                    <FiShoppingCart />,
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
        </>
    )
};
export default Cards;