import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from './loginSchema.jsx';
import SubHeader from '../../subHeader/SubHeader.jsx';
import { Helmet } from 'react-helmet';
import "./Login.css"
export default function Login({ getUser }) {
    let [error, setError] = useState([]);
    let navigate = useNavigate();
    let [statusError, setstatusError] = useState('');
    let { errors, values, handleChange, handleSubmit, handleBlur, touched } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: login
    })
    async function login(values) {
        let { data } = await axios.post('https://movify-node-js.onrender.com/auth/signin', values).catch((err) => {
            setstatusError(err.response.data.message)
            console.log(data)
        })
        if (data.message === "success") {
            setError([])
            setstatusError('')
            localStorage.setItem('token', data.token);
            getUser()
            navigate('../');
        } else {
            setError(data.validationArray[0])
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
                    {error.map((err) => {
                        return <div className='alert alert-danger'>{err.message}</div>
                    })}

                </div>
                <form className='w-50 m-auto  mb-5 py-5' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail" className='form-label'>Email</label>
                        <input type="email" id="exampleInputEmail"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='email'
                            placeholder='Your Email'
                            className={`form-control ${errors.email && touched.email ? "is-invalid" : ""}`}
                        />
                        {errors.email && touched.email ? <div className='small text-danger'>{errors.email}</div> : <></>}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword" className='form-label'>Password</label>
                        <input type="password" id="exampleInputPassword"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='password'
                            placeholder='Your Password'
                            className={`form-control ${errors.password && touched.password ? "is-invalid" : ""}`}
                        />
                        {errors.password && touched.password ? <div className='small text-danger'>{errors.password}</div> : <></>}
                    </div>
                    <div className='small text-danger'>{statusError}</div>
                    <button type='submit' className='main-btn btn mb-1'>Login</button>
                    <div>  Not a member? <Link to="../register">Sign up</Link></div>
                </form>
            </div>
        </>
    )
}
