import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup';
import '../Login/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SubHeader from '../../subHeader/SubHeader.jsx';
export default function Login({getUser}) {
   let [errors,setErrors]= useState([]);
   let [statusError,setstatusError]=useState('');
   let navigate=useNavigate();
   const schema=Yup.object({
    email:Yup.string().required("email is required").email("not valid email"),
    password:Yup.string().required("password is required"),
  })
  let formik = useFormik({
    initialValues:{
        email:'',
        password:'',
    },validationSchema:schema,
    onSubmit:sendLoginData,
})
async function sendLoginData(values){
  let {data}=await axios.post('https://movify-node-js.onrender.com/auth/signin',values).catch((err)=>{
  setstatusError(err.response.data.message)
  })
  if(data.message ==='success'){
    setErrors([]);
    setstatusError('');
    localStorage.setItem("token",data.token);
getUser();
    navigate('../');
  }
}
return (
            <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Login Page</title>
                    <meta name='login' content='this is movify login page' />
                </Helmet>
                <SubHeader pname="Login Now!" />
                <div className="container login mt-1 pt-5">
                    <div className="w-50 m-auto">
                        {errors.map((err) => {
                            return <div className='alert alert-danger'>{err.message}</div>
                        })}
    
                    </div>
                    <form className='w-50 m-auto  mb-5 py-5' onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail" className='form-label'>Email</label>
                            <input type="email" id="exampleInputEmail"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name='email'
                                placeholder='Your Email'
                                className={`form-control ${formik.errors.email && formik.touched.email ? "is-invalid" : ""}`}
                            />
                            {formik.errors.email && formik.touched.email ? <div className='small text-danger'>{formik.errors.email}</div> : <></>}
    
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword" className='form-label'>Password</label>
                            <input type="password" id="exampleInputPassword"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name='password'
                                placeholder='Your Password'
                                className={`form-control ${formik.errors.password && formik.touched.password ? "is-invalid" : ""}`}
                            />
                            {formik.errors.password && formik.touched.password ? <div className='small text-danger'>{formik.errors.password}</div> : <></>}
                        </div>
                        <div className='small text-danger'>{statusError}</div>
                        <button  type='submit' className='main-btn btn mb-1'>Login</button>
                        <div>  Not a member? <Link to="../register">Sign up</Link></div>
                    </form>
                </div>
            </>
        )}