import React from 'react'

const  CategoryForm= ({ handleSubmit, value, setValue }) => {
  return (
    <div className='flex mt-10 justify-center items-center '>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Enter new category"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>

    <button type="submit" className="rounded-lg bg-[#f5f5f5] p-2 hover:rounded-full">
      Submit
    </button>
  </form>
    </div>
  )
}

export default CategoryForm