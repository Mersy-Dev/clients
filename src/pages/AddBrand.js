import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { createBrand } from '../features/brand/brandSlice';


let schema = yup.object().shape({
  title: yup.string().required('Brand name is required'),

});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const brandCreate = useSelector(state => state.brand);
  const {isSuccess, isError, createdBrand} = brandCreate;

  useEffect(() => {
    if(isSuccess && createdBrand){
    toast.success('Brand Added Successfully');
    }
    if(isError && createdBrand){
    toast.error('Brand Added Failed');
    }
  }, [ isSuccess, isError, createdBrand]);

  const formik = useFormik({
    initialValues: {
        title: '',
    
    },  
    validationSchema: schema,
    onSubmit: values => {
        // alert (JSON.stringify(values, null, 2));
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
            navigate('/admin/brand-list');
        } , 3000);
    }
  });
  return (
    <div>
        <h3 className="mb-4 title">Add Brand </h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit} >
                <CustomInput type='text' label="Enter Your Brand"  value={formik.values.title} name="title" onChange={formik.handleChange("title")} onBlur={formik.handleBlur("title")}/>
                <div className='error'>
                        {formik.touched.title && formik.errors.title ? <div className='text-danger'>{formik.errors.title}</div> : null}
                    </div>
                <button className='btn btn-primary border-0 rounded-3 py-3 my-3' type='submit'> Add Blog Category</button>
            </form>
        </div>
    </div>
  )
}

export default AddBrand