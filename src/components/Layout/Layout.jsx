import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'


export default function Layout({user,setUser}) {
    let navigate=useNavigate();
    function logOut(){
        localStorage.removeItem('token');
        setUser(null);
        navigate('./');
    
    }

  return (
 <>
     <Navbar user={user} logOut={logOut}/>
     <Outlet></Outlet>
     <Footer/>
 </>
    )
}
