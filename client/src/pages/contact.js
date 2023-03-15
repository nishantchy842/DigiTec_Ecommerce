import React, { useEffect,useState } from 'react'
import Layout from '../component/layout/layout'


const Contact = () => {
  const [quotes, setQuotes] = useState([])
   const date = new Date();
 
  const getQuotes = setInterval(() => {
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
  },1000 * 60 * 60)

  return (
    <Layout title={"Contact - feel free to contact"}>
      <h1>Contact</h1>
      <p>{quotes.quote}</p>
      <p>{quotes.author}</p>
      
      
    </Layout>
  )
}

export default Contact
