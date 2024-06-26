import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SubHeader from '../../subHeader/SubHeader.jsx';
export default function Register() {
   let [errors,setErrors]= useState([]);
   let [statusError,setstatusError]=useState('');
   let navigate= useNavigate();
   const schema=Yup.object({
    userName:Yup.string().required("name is required").min(3,"min is 3 characters").max(10,"max is 10 characters"),
    email:Yup.string().required("email is required").email("not valid email"),
    password:Yup.string().required("password is required"),
    cPassword:Yup.string().required("Confirm Password").oneOf([Yup.ref('password')],"mismatch passwords")

    
  })
  let formik = useFormik({
    initialValues:{
        userName:'',
        email:'',
        password:'',
        cPassword:''
    },validationSchema:schema,
    onSubmit:sendRegisterData,
})
async function sendRegisterData(values){
  let {data}=await axios.post('https://movify-node-js.onrender.com/auth/signup',values).catch((err)=>{
 setstatusError(err.response.data.message) ;
  })

  if(data.message ==='success'){
    setErrors([]);
    setstatusError('');
    navigate('/login');
  }else{
    console.log(data);
    setErrors(data.validationArray[0]);
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
            {errors.map((err)=>{
                return <div className='alert alert-danger'>{err.message}</div>
            })}
        </div>
        <form className='w-50 m-auto mb-5 py-3' onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputuserName" className='form-label'>Username</label>
                <input type="text" id="exampleInputuserName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name='userName'
                placeholder='Your Username'
                className={`form-control ${formik.errors.userName && formik.touched.userName? "is-invalid":""}`}
                />
                {formik.errors.userName && formik.touched.userName ? <div className='small text-danger'>{formik.errors.userName}</div>:<></>}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail" className='form-label'>Email</label>
                <input type="email" id="exampleInputEmail"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name='email'
                placeholder='Your Email'
                className={`form-control ${formik.errors.email && formik.touched.email? "is-invalid":""}`}
                />
                {formik.errors.email && formik.touched.email ? <div className='small text-danger'>{formik.errors.email}</div>:<></>}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword" className='form-label'>Password</label>
                <input type="password" id="exampleInputPassword"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name='password'
                placeholder='Your Password'
                className={`form-control ${formik.errors.password && formik.touched.password? "is-invalid":""}`}
                />
                {formik.errors.password && formik.touched.password ? <div className='small text-danger'>{formik.errors.password}</div>:<></>}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputcPassword" className='form-label'>Confirm Password</label>
                <input type="password" id="exampleInputcPassword"
                value={formik.values.cPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name='cPassword'
                placeholder='Confirm Password'
                className={`form-control ${formik.errors.cPassword && formik.touched.cPassword? "is-invalid":""}`}
                />
                {formik.errors.cPassword && formik.touched.cPassword ? <div className='small text-danger'>{formik.errors.cPassword}</div>:<></>}
            </div>
            <div className='small text-danger'>{statusError}</div>
            <button type='submit' className='btn main-btn'>Register</button>
             <div>Already have an account? <Link to="../login">Sign in</Link></div>
        </form>
       </div>
       </>
      )
    }