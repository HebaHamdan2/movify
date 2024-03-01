import { useEffect } from 'react';
import './Header.css'

export default function Header() {
 
  useEffect(()=>{  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});},[])
  
  return (
<div className="header" id="header">
<div className="header-content d-flex justify-content-center align-items-center" style={{height:100+"vh"}}>
    <div className="container text-center">
        <h1>Welcome to movify</h1>
        <p>Your streaming guide for movies &TV shows</p>
    </div>

</div>
</div>
  )
}
