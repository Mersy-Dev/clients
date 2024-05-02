import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { createBrand, getBrand, resetState, updateBrand } from '../features/brand/brandSlice';


let schema = yup.object().shape({
  title: yup.string().required('Brand name is required'),

});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const getBrandId = location.pathname.split('/')[3];
  const brandCreate = useSelector(state => state.brand);
  const { isSuccess, isError, createdBrand, brandName, updatedBrand } = brandCreate;


  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getBrand(getBrandId));
    } else {
      dispatch(resetState())
    }
  }, [getBrandId]);


  console.log(getBrandId);

  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || '',
    },
    validationSchema: schema,
    onSubmit: values => {
      // alert (JSON.stringify(values, null, 2));
      if (getBrandId !== undefined) {
        const data = {
          id: getBrandId,
          brandData: values
        };
        dispatch(updateBrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate('/admin/brand-list');
        }, 1000);
      }
    }
  });

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success('Brand Added Successfully');
    }
    if (isSuccess && updatedBrand) {
      toast.success('Brand Updated Successfully');
      navigate('/admin/brand-list');
    }
    if (isError && createdBrand) {
      toast.error('Brand Added Failed');
    }
  }, [isSuccess, isError, createdBrand]);

  return (
    <div>
      <h3 className="mb-4 title">{getBrandId !== undefined ? "Edit" : "Add"}  Brand </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit} >
          <CustomInput type='text' label="Enter Your Brand" value={formik.values.title} name="title" onChange={formik.handleChange("title")} onBlur={formik.handleBlur("title")} />
          <div className='error'>
            {formik.touched.title && formik.errors.title ? <div className='text-danger'>{formik.errors.title}</div> : null}
          </div>
          <button className='btn btn-primary border-0 rounded-3 py-3 my-3' type='submit'>  {getBrandId !== undefined ? "Update" : "Add"}   Blog Category</button>
        </form>
      </div>
    </div>
  )
}

export default AddBrand