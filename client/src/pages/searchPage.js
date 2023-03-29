import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';
import { decreaseCart, increaseCart, } from '../Redux/reducer/countSlice'
const { Meta } = Card;
const SearchPage = () => {
    const navigate = useNavigate()
    const count = useSelector(state => state.addCart.count)
    const dispatch = useDispatch()
    const { results } = useSelector(state => state.search)
    console.log(results.result)
    const respectiveProduct = (item, slug) => {
        navigate(`/product/${slug}`, { state: item })
    }
    return (
        <div>
            {
                results.map(item=>{
                    return console.log(item.result)
                })
            }  
        </div>
    )
}

export default SearchPage
