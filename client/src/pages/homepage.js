import React from 'react'
import Layout from '../component/layout/layout'
import Cards from '../component/cards'
import FilterByCatergory from '../utils/filterDrawer'
import { Carousel } from 'antd';

const contentStyle = {
  height: '80vh',
  width:'100vw',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  backgroundColor: 'red',
  objectFit: 'cover',
  marginBottom:'30px'
};

const Homepage = () => {
  return (
    <Layout title={'DigiTec'}>
      <Carousel autoplay dotPosition='top' >
        <div>
          <img style={contentStyle}
            src='https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg'
            alt="imag" />
        </div>
        <div>
          <img style={contentStyle}
            src='https://cdn.pixabay.com/photo/2017/01/18/10/43/banner-1989514_1280.png'
            alt="imag" />
        </div>
        <div>
          <img style={contentStyle}
            src='https://img.freepik.com/free-photo/black-friday-splash-banner-background_1361-3536.jpg?w=2000'
            alt="imag" />
        </div>
        <div>
          <img style={contentStyle}
            src='https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg'
            alt="imag" />
        </div>
      </Carousel>
      <div className='flex'>
        <FilterByCatergory />
        <Cards />
      </div>
    </Layout>
  )
}

export default Homepage
