import React  from 'react'
import { Helmet } from 'react-helmet'
import Details from '../../components/Details/Details.jsx'
export default function DetailsPage() {
 
  return (
   <>
    <Helmet>
                <meta charSet="utf-8" />
                <title> Movie Details</title>
                <meta name='Home' content='this is details page ' />
            </Helmet>
          <Details base={'movie'}/>
           
   </>
  )
}
