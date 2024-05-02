import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { createPcategory, getPcategoryById, resetPcatState, updatePcategory } from '../features/pcategory/pcategorySlice';

const schema = yup.object().shape({
  title: yup.string().required('Category name is required'),
});

const AddCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getCatId = location.pathname.split('/')[3];
  const catCreate = useSelector(state => state.pcategory);
  const { isSuccess, isError, updatedPcategory, singlePcategory } = catCreate;

  useEffect(() => {
    if (getCatId !== undefined) {
      dispatch(getPcategoryById(getCatId));
    } else {
      dispatch(resetPcatState());
    }
  }, [dispatch, getCatId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: singlePcategory || '',
    },
    validationSchema: schema,
    onSubmit: async values => {
      try {
        if (getCatId !== undefined) {
          const data = {
            id: getCatId,
            categoryData: values,
          };
          await dispatch(updatePcategory(data));
          toast.success('Product Category Updated Successfully');
        } else {
          await dispatch(createPcategory(values));
          toast.success('Product Category Added Successfully');
          formik.resetForm();
          navigate('/admin/category-list');
        }
      } catch (error) {
        toast.error('Product Category Adding/Updating Failed');
      }
    },
  });

  useEffect(() => {
    if (isSuccess && updatedPcategory) {
      navigate('/admin/category-list');
    }
  }, [isSuccess, updatedPcategory, navigate]);

  return (
    <div>
      <h3 className="mb-4 title">{getCatId !== undefined ? 'Edit' : 'Add'} Product Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type='text'
            label="Enter Product Category"
            value={formik.values.title}
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
          />
          <div className='error'>
            {formik.touched.title && formik.errors.title ? <div className='text-danger'>{formik.errors.title}</div> : null}
          </div>
          <button className='btn btn-primary border-0 rounded-3 py-3 my-3' type='submit'> {getCatId !== undefined ? 'Update' : 'Add'} Product Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCat;
