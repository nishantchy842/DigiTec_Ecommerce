
import React from 'react'

const Search = (props) => {
  return (
    <>
      <div className='flex justify-center items-center h-20'>
        <input onKeyUp={(e) => props.getAllProducts('1', e.target.value)} placeholder='search orders..'
          className='h-10 border w-[500px] p-5'
        ></input>
      </div>
    </>
  )
}
export default Search