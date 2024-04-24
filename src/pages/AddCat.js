import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { createPcategory } from '../features/pcategory/pcategorySlice';


let schema = yup.object().shape({
  title: yup.string().required('Category name is required'),

});

const AddCat = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const catCreate = useSelector(state => state.pcategory);
  const {isSuccess, isError, pcategory} = catCreate;

  useEffect(() => {
    if(isSuccess && pcategory){
    toast.success('Product Category Added Successfully');
    }
    if(isError && pcategory){
    toast.error('Product Category Adding Failed');
    }
  }, [ isSuccess, isError, pcategory]);

  const formik = useFormik({
    initialValues: {
        title: '',
    
    },  
    validationSchema: schema,
    onSubmit: values => {
        // alert (JSON.stringify(values, null, 2));
        dispatch(createPcategory(values));   
        formik.resetForm();
        setTimeout(() => {
            navigate('/admin/category-list');
        } , 3000);
    }
  });

  return (
    <div>
        <h3 className="mb-4 title">Add Product Category</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type='text'  label="Enter Product Category"  value={formik.values.title} name="title" onChange={formik.handleChange("title")} onBlur={formik.handleBlur("title")}/>
                <div className='error'>
                    {formik.touched.title && formik.errors.title ? <div className='text-danger'>{formik.errors.title}</div> : null}
                </div>
                <button className='btn btn-primary border-0 rounded-3 py-3 my-3' type='submit'> Add Blog Category</button>
            </form>
        </div>
    </div>
  )
}

export default AddCat