import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
 <>
 <footer className="footer py-5 " id='footer'>
  <div className="container pt-5">
    <div className="row d-flex justify-content-between align-items-center text-align-center">
    <div className="col-lg-3 col-md-6 col-sm-12 ">
<img src=".././assets/logo-white.png" alt="logo-white" />
<p className='text-start'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, ducimus, atque. Praesentium suscipit provident explicabo dignissimos nostrum numquam deserunt earum accusantium et fugit.</p>
    </div>
    <div className="col-lg-3 col-md-6 col-sm-12 text-start">
      <h4 className='useful'>Useful Links</h4>
      <ul>
        <li className='pt-1'> <Link to="#">About Movify</Link></li>
        <li  className='pt-1'><Link to="#">Blog</Link></li>
        <li  className='pt-1'><Link to="#">Forum</Link></li>
        <li  className='pt-1'><Link  to="#">My Account</Link></li>
        <li  className='pt-1'><Link  to="#">Watch List</Link></li>
      </ul>
    </div>
    <div className="col-lg-3 col-md-6 col-sm-12 text-start">
    <h4 className='latest'>Latet News</h4>
      <ul className='text-start pt-1'>
        <li><Link to='#'>Blog Post1</Link> </li>
        <small>JANURAY 13,2024</small>
        <li><Link to='#'>Blog Post2</Link> </li>
        <small>JANURAY 13,2024</small>
        <li><Link to='#'>Blog Post3</Link> </li>
        <small>JANURAY 13,2024</small>
      </ul>
    </div>
    <div className="col-lg-3 col-md-6 col-sm-12 text-start">
      <h4>Follow Us</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, ducimus, atque.</p>
      <div className="social">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-x-twitter"></i>
            <i className="fa-brands fa-google-plus-g"></i>
            <i className="fa-brands fa-instagram"></i>
          </div>
    </div>
    </div>
    
  </div>
 </footer>
 <div className="footer-bottom pt-5 pb-3">
  <div className="container">
    <div className="row d-flex col-sm-12 justify-content-around align-items-center">
      <div className="col-lg-9 inline-list ">
      <ul className='unstayled-list '>
          <li><Link to="#">Privacy & Cookies</Link></li>
          <li><Link to="#">Terms & Conditions</Link></li>
          <li><Link to="#">Legal Disclaimer</Link></li>
          <li><Link to="#">Community</Link></li>
        </ul>
      </div>
      <div className="col-lg-3 col-sm-12">
        <span><p>All Rights Reserved by <Link to="\home">Movify.</Link></p></span>
        <span><p>Done by <Link to="https://www.linkedin.com/in/heba-hamdan-64b83829b/">Heba Hamdan.</Link></p></span>
      </div>
    </div>
  </div>
 </div>
 </>
  )
}
