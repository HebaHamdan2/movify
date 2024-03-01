import React from 'react'
import { Helmet } from 'react-helmet'
import Details from '../../components/Details/Details.jsx'
export default function DetailsTVPage() {
  
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title> Details</title>
                <meta name='Details' content='this is tv show details page ' />
            </Helmet>
         
               <Details base={'tv'} />

           
   </>
  )
}
