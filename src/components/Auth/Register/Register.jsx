import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema } from './registerSchema.jsx';
import axios from 'axios';
import SubHeader from '../../subHeader/SubHeader.jsx';
import { Helmet } from 'react-helmet';
import "../Login/Login.css"
export default function Register() {
 let[err,setError]=useState([]);
 let navigate=useNavigate();
 let [statusError,setstatusError]=useState('');
 let {errors,values,handleChange,handleSubmit,handleBlur,touched}=useFormik({
   initialValues:{
    userName:"",
    email:"",
    password:"",
    cPassword:""
   },
   validationSchema:registerSchema,
 onSubmit:register
 });
 async function register(values){
   let {data}=await axios.post('https://movify-node-js.onrender.com/auth/signup',values).catch((err)=>{
    setstatusError(err.response.data.message)
     })
   if(data.message==="success"){
    setError([]);
    setstatusError('');
    navigate('../login');
   }else{
    setError(data.validationArray[0])
   }
}
    return (
   <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>Register Page</title>
               <meta name='register' content='this is movify register page' />
            </Helmet>
   <SubHeader pname={'Register now!'}/>
   <div className="container mt-1 pt-5 reg">
    <div className="w-50 m-auto">
        {err.map((err)=>{
            return <div className='alert alert-danger'>{err.message}</div>
        })}
    </div>
    <form className='w-50 m-auto mb-5 py-3' onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputuserName" className='form-label'>Username</label>
            <input type="text" id="exampleInputuserName"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            name='userName'
            placeholder='Your Username'
            className={`form-control ${errors.userName && touched.userName? "is-invalid":""}`}
            />
            {errors.userName && touched.userName ? <div className='small text-danger'>{errors.userName}</div>:<></>}
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail" className='form-label'>Email</label>
            <input type="email" id="exampleInputEmail"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            name='email'
            placeholder='Your Email'
            className={`form-control ${errors.email && touched.email? "is-invalid":""}`}
            />
            {errors.email && touched.email ? <div className='small text-danger'>{errors.email}</div>:<></>}
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword" className='form-label'>Password</label>
            <input type="password" id="exampleInputPassword"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            name='password'
            placeholder='Your Password'
            className={`form-control ${errors.password && touched.password? "is-invalid":""}`}
            />
            {errors.password && touched.password ? <div className='small text-danger'>{errors.password}</div>:<></>}
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputcPassword" className='form-label'>Confirm Password</label>
            <input type="password" id="exampleInputcPassword"
            value={values.cPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            name='cPassword'
            placeholder='Confirm Password'
            className={`form-control ${errors.cPassword && touched.cPassword? "is-invalid":""}`}
            />
            {errors.cPassword && touched.cPassword ? <div className='small text-danger'>{errors.cPassword}</div>:<></>}
        </div>
        <div className='small text-danger'>{statusError}</div>
        <button type='submit' className='btn main-btn'>Register</button>
         <div>Already have an account? <Link to="../login">Sign in</Link></div>
    </form>
   </div>
   </>
  )
}
