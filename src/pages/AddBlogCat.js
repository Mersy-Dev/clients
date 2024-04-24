import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { createBcategory } from '../features/bcategory/bcategorySlice';


let schema = yup.object().shape({
  title: yup.string().required('Category name is required'),

});

const AddBlogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const catCreate = useSelector(state => state.bcategory);
  const {isSuccess, isError, bcategoryCreated} = catCreate;

  // useEffect(() => {
  //   if(isSuccess && bcategoryCreated){
  //   toast.success('Blog Category Added Successfully');
  //   }
  //   if(isError && bcategoryCreated){
  //   toast.error('Blog Category Adding Failed');
  //   }
  // }, [ isSuccess, isError, bcategoryCreated]);

  const formik = useFormik({
    initialValues: {
        title: '',
    
    },  
    validationSchema: schema,
    onSubmit: async values => {
      try {
        await dispatch(createBcategory(values));
        toast.success('Blog Category Added Successfully');
        setTimeout(() => {
          navigate('/admin/blog-category-list');
        }, 3000);
      } catch (error) {
        toast.error('Blog Category Adding Failed');
      }
      formik.resetForm();
    },
  });

  return (
    <div>
        <h3 className="mb-4 title">Add Blog Category</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type='text' label="Enter Blog Category" value={formik.values.title} name="title" onChange={formik.handleChange("title")} onBlur={formik.handleBlur("title")} id="blogcat" />
                <div className='error'>
                    {formik.touched.title && formik.errors.title ? <div className='text-danger'>{formik.errors.title}</div> : null}
                </div>
                <button className='btn btn-primary border-0 rounded-3 py-3 my-3' type='submit'> Add Blog Category</button>
            </form>
            
        </div>
    </div>
  )
}

export default AddBlogCat