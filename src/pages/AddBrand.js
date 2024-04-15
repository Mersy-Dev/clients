import React from 'react'
import CustomInput from '../components/CustomInput'

const AddBrand = () => {
  return (
    <div>
        <h3 className="mb-4 title">Add Brand </h3>
        <div>
            <form action="">
                <CustomInput type='text' label="Enter Your Brand"/>
                <button className='btn btn-primary border-0 rounded-3 py-3 my-3' type='submit'> Add Blog Category</button>
            </form>
        </div>
    </div>
  )
}

export default AddBrand