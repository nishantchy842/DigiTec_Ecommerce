import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  
  return (
    <div className='bg-slate-900 text-gray-100 text-center h-20'>
      <h1 className='text-2xl'>All Right reserved &copy; Nishant</h1>
      <div className='flex justify-center text-center'>
      <Link to={'/contact'}>Contact</Link>
      </div>
    </div>
  )
}

export default Footer
