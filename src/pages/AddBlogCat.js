import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { createBcategory, getBcategoryById, resetBcatState, updateBcategory } from '../features/bcategory/bcategorySlice';


let schema = yup.object().shape({
  title: yup.string().required('Category name is required'),

});

const AddBlogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getBcatId = location.pathname.split('/')[3];
  const catCreate = useSelector(state => state.bcategory);
  const {isSuccess, isError, singleBcategory, updatedBcategory, bcategoryCreated} = catCreate;

  useEffect(() => {
    if (getBcatId !== undefined) {
       dispatch(getBcategoryById(getBcatId));
    } else {
      dispatch(resetBcatState())
    }
  }, [getBcatId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: singleBcategory || '',
    },
    validationSchema: schema,
    onSubmit: values => {
      // alert (JSON.stringify(values, null, 2));
      if (getBcatId !== undefined) {
        const data = {
          id: getBcatId,
          bcategoryData: values
        };
        dispatch(updateBcategory(data));
        dispatch(resetBcatState());
      } else {
        dispatch(createBcategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetBcatState());
          navigate('/admin/blog-category-list');
        }, 1000);
      }
    }
  });

  useEffect(() => {
    if (isSuccess && updatedBcategory) {
      toast.success('Blog Category Updated Successfully');
      navigate('/admin/blog-category-list');
    }
    if (isError && updatedBcategory) {
      toast.error('Brand Added Failed');
    }
  }, [isSuccess, isError, updatedBcategory]);

  return (
    <div>
        <h3 className="mb-4 title">{getBcatId !== undefined ? "Edit" : "Add"} Blog Category</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type='text' label="Enter Blog Category" value={formik.values.title} name="title" onChange={formik.handleChange("title")} onBlur={formik.handleBlur("title")} id="blogcat" />
                <div className='error'>
                    {formik.touched.title && formik.errors.title ? <div className='text-danger'>{formik.errors.title}</div> : null}
                </div>
                <button className='btn btn-primary border-0 rounded-3 py-3 my-3' type='submit'> {getBcatId !== undefined ? "Update" : "Add"} Blog Category</button>
            </form>
            
        </div>
    </div>
  )
}

export default AddBlogCat