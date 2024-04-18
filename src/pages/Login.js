import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { Link, useNavigate } from 'react-router-dom';
import {useFormik} from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';




const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let schema = yup.object().shape({
    email: yup.string().email('enter a valid email').required('email is required'),
    password: yup.string().required('password is required')
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(login(values)) 
      alert (JSON.stringify(values, null, 2))
    }
  })

  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth);
  useEffect(() => {
    if(!user == null || isSuccess){
      navigate('/admin')
    }else{
     navigate('')
    }
  }, [user, isLoading, isError, isSuccess, message ]);


  return (
    <div className='py-5' style={{ background: "#ffd333", minHeight:'100vh' }}>
      <br />   <br />   <br />   <br /> 
      <div className='my-5 bg-white rounded-3 mx-auto p-3' style={{width:'550px'}}>
        <h3 className=' text-center title'>Login</h3>
        <p className=' text-center'>Login to your account</p>
        <div className='error text-center'>
        {message.message == "Rejected" ? " You are not authorized to access this page" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput type='email' name="email" val={formik.values.email} id='email' label='Email Address' onchng={formik.handleChange("email")} />
          {formik.touched.email && formik.errors.email ? <div className='text-danger'>{formik.errors.email}</div> : null }
          <CustomInput type='password' name="password" val={formik.values.password} id='password' label='Password' onchng={formik.handleChange("password")} />
          {formik.touched.password && formik.errors.password ? <div className='text-danger'>{formik.errors.password}</div> : null }
          <div className=' mb-3 text-end'>
              <Link to="/forgot-password" className=''>Forgot Password?</Link>
          </div>
          <button className=' border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5' type='submit' style={{ background: "#ffd333" }}> Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login