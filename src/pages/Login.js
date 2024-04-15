import React from 'react'
import CustomInput from '../components/CustomInput'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='py-5' style={{ background: "#ffd333", minHeight:'100vh' }}>
      <br />   <br />   <br />   <br /> 
      <div className='my-5 bg-white rounded-3 mx-auto p-3' style={{width:'550px'}}>
        <h3 className=' text-center title'>Login</h3>
        <p className=' text-center'>Login to your account</p>
        <form action="">
          <CustomInput type='email' id='email' label='Email Address' />
          <CustomInput type='password' id='password' label='Password' />
          <div className=' mb-3 text-end'>
              <Link to="/forgot-password" className=''>Forgot Password?</Link>
          </div>
          <Link to="/admin" className=' border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5' type='submit' style={{ background: "#ffd333" }}> Login</Link>
        </form>
      </div>
    </div>
  )
}

export default Login