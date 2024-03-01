import React from 'react'
import { Helmet } from 'react-helmet'
import SubHeader from '../../components/subHeader/SubHeader.jsx'
import Getall from '../../components/SearchPagination/Getall.jsx'
export default function TVShows() {
  return (
    <>
  <Helmet>
        <meta charSet="utf-8" />
        <title>TV Shows</title>
        <meta name='TV Shows' content='this is TV Shows List page ' />
    </Helmet>
    <SubHeader pname={'Discover from TV Shows List'} />
   <Getall base={'tv'} />
    

   
</>
  )
}
