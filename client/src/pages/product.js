import React from 'react'
import { useLocation } from 'react-router-dom'
import Layout from '../component/layout/layout'

const Product = () => {
    const {state} = useLocation()
    console.log(state)
  return (
    <Layout>
      <p>I am product</p>
      <p>{state.name}</p>
    </Layout>
  )
}

export default Product
