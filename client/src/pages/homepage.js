import React from 'react'
import Layout from '../component/layout/layout'
import Cards from '../component/cards'

const Homepage = () => {
  return (
    <Layout title={'DigiTec'}>
      <h1 className='text-center'> image</h1>
      <div className=''>
        <Cards />
      </div>
    </Layout>
  )
}

export default Homepage
