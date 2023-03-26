import React, { useEffect, useState } from 'react'
import Layout from '../component/layout/layout'


const Contact = () => {
  const [quotes, setQuotes] = useState([])
  const date = new Date();

  const getQuotes = useEffect(() => {
    fetch('https://dummyjson.com/quotes/random')
      .then(function (response) {
        return response.json()
      })
      .then((data) => {
        setQuotes(data)
      })
      .catch((error) => {
        console.log(error)
      })
  },[])

  return (
    <Layout title={"Contact - feel free to contact"}>
    <h1 className='text-center font-extrabold stroke-indigo-300 text-5xl'>Contact</h1>
      <div className=' min-h-[75vh] flex flex-col justify-center items-center'>
        <div className=' h-[200px] w-[500px] text-center'>
        <p>{quotes.quote}</p>
        <p>{quotes.author}</p>
        </div>
      </div>


    </Layout>
  )
}

export default Contact
