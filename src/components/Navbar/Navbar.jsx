import React from 'react'
import { Link} from 'react-router-dom'
import "./Navbar.css";
export default function Navbar({user,logOut}) {
  return (
    <>
 <nav className="navbar navbar-expand-lg bg-white">
  <div className="container">
    <Link className="navbar-brand" to="" >
      <img  src="../../../assets/logo.png" alt="logo" />
    </Link>
    <button className="navbar-toggler "  type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse justify-content-between align-items-center" id="navbarSupportedContent">
      <ul className="navbar-nav  mb-2 mb-lg-0  text-white">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/movieList">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tvlist">TV Shows</Link>
        </li>
        
      </ul>
  
      <ul className="navbar-nav ms-0 mb-2 mb-lg-0 align-items-center ">
       {user?  
        <>
     <li className="nav-item">
     <Link className="nav-link"to='watchlist'>Watchlist</Link>
   </li>
    <li className="nav-item">
    <Link className="nav-link"to='favorite'>Favourite</Link>
  </li>
  <li className="nav-item">
       <Link to="#" className="nav-link btn main-btn" onClick={logOut}>Logout</Link>
     </li>
     </> :
     <li className="nav-item login">
     <Link className="nav-link btn main-btn" to="/login"><i class="fa-regular fa-user"></i> Login</Link>
   </li>
     }
 


      </ul>

    </div>
  </div>
</nav>
</>

  )
}
