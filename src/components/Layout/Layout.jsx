import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { FavContext } from '../Contexts/FavStore.jsx';
import { WatchContext } from '../Contexts/Watchlist.jsx';



export default function Layout({user,setUser}) {
    let navigate=useNavigate();
    let{setFavList}=useContext(FavContext)
    let{setDetail}=useContext(WatchContext)
    function logOut(){
        localStorage.removeItem('token');
        setUser(null);
        setFavList([]);
        setDetail([])
        localStorage.removeItem("watchlist");
        localStorage.removeItem("favorite");
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
