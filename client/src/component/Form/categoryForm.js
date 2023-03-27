import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div className='flex mt-10 justify-center items-center '>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className=" placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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