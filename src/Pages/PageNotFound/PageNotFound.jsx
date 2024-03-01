import React from 'react'
import { Helmet } from 'react-helmet'
import SubHeader from '../../components/subHeader/SubHeader.jsx'
import "./NotFound.css";
export default function PageNotFound() {
  return (
   <>
   <Helmet>
        <meta charSet="utf-8" />
        <title>404 Not Found</title>
        <meta name='Not Found' content='this is not found page ' />
    </Helmet>
    <SubHeader pname={'404 Page'} />
 <main className="page-not-found">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h2>404</h2>
        <h3>Page Not Found!</h3>
        <p>We're sorry, but the page you were looking for doesn't exist.</p>
      </div>
    </div>
  </div>
</main>

    
   </>
  )
}
