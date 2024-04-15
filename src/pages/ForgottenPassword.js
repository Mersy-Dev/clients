import React from 'react'
import CustomInput from '../components/CustomInput'

const ForgottenPassword = () => {
  return (
    <div className='py-5' style={{ background: "#ffd333", minHeight:'100vh' }}>
      <br />   <br />   <br />   <br /> 
      <div className='my-5 bg-white rounded-3 mx-auto p-4' style={{width:'550px'}}>
        <h3 className=' text-center title'>Forgot Password</h3>
        <p className=' text-center'>Please enter your registered email to reset password</p>
        <form action="">
          <CustomInput type='email' id='email' label='Email Address' />
          <button className=' border-0 px-3 py-2 text-white fw-bold w-100' type='submit' style={{ background: "#ffd333" }}> Send Link</button>
        </form>
      </div>
    </div>
  )
}

export default ForgottenPassword