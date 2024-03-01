import React from 'react'
import { Helmet } from 'react-helmet'
import Trending from '../../components/Trending/Trending.jsx'
import Upcomingmovies from '../../components/UpcomingMovies/Upcomingmovies.jsx'
import Header from '../../components/Header/Header.jsx'
export default function Home() {
 


  return (
    <>      <Helmet>
                <meta charSet="utf-8" />
                <title>Movify</title>
                <meta name='Home' content='this is Home page ' />
            </Helmet>
            
            <Header/>
            <Trending base={'movie'}/>
            <Upcomingmovies/>
            <Trending base={'tv'}/>
       
         
            </>
          
           

  )
}
