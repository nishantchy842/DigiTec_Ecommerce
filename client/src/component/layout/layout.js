import React from 'react'
import Footer from './footer'
import Header from './header'
import { Helmet } from "react-helmet";


const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className='min-h-[79vh]'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: "DigiTec - Shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Techinfoyt",
};

export default Layout
