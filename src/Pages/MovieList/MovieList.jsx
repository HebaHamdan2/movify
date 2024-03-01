import React from 'react'
import { Helmet } from 'react-helmet'
import SubHeader from '../../components/subHeader/SubHeader.jsx'
import Getall from '../../components/SearchPagination/Getall.jsx'


export default function MovieList() {
  return (
    <>
    
    <Helmet>
        <meta charSet="utf-8" />
        <title>Movies</title>
        <meta name='Movies' content='this is Movies List page ' />
    </Helmet>
    
    <SubHeader pname={'Discover from Movie List'} />
   <Getall base={'movie'} />
   


   
</>
  )
}
