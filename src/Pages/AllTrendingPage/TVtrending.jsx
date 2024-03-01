import React from 'react'
import { Helmet } from 'react-helmet'
import SubHeader from '../../components/subHeader/SubHeader.jsx'
import Showall from '../../components/AllTrending/AllTrending.jsx'

export default function TVtrending() {
  return (
   <>
   <Helmet>
        <meta charSet="utf-8" />
        <title>Trending TV</title>
        <meta name='All Trending' content='this is all trending tv shows page ' />
    </Helmet>
    <SubHeader pname={'Trending TV Shows'} />
   <Showall base={'tv'} />  
   </>
  )
}
