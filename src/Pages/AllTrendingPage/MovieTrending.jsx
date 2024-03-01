import React from 'react'
import { Helmet } from 'react-helmet'
import SubHeader from '../../components/subHeader/SubHeader.jsx'
import Showall from '../../components/AllTrending/AllTrending.jsx'
export default function MovieTrending() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Trending Movies</title>
        <meta name='All Trending' content='this is all trending movies page ' />
    </Helmet>
    <SubHeader pname={'Trending Movies'} />
   <Showall base={'movie'} />
  
   
  
    
   
   </>
  )
}
