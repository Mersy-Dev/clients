import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { createColor, resetColState, updateColor } from '../features/color/colorSlice';


let schema = yup.object().shape({
  title: yup.string().required('Color name is required'),

});

const AddColor = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getColId = location.pathname.split('/')[3];
  const colCreate = useSelector(state => state.color);
  const {isSuccess, isError, colorsCreated, colorName, colorUpdated} = colCreate;

  useEffect(() => {
    if(isSuccess && colorsCreated){
    toast.success('Color Created Successfully');
    }
    if(isError && colorsCreated){
    toast.error('Color Creating Failed');
    }
  }, [ isSuccess, isError , colorsCreated]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || '',
    }, 
    validationSchema: schema,
    onSubmit: values => {
      // alert (JSON.stringify(values, null, 2));
      if (getColId !== undefined) {
        const data = {
          id: getColId,
          colorData: values
        };
        dispatch(updateColor(data));
        dispatch(resetColState());
      } else {
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetColState());
          navigate('/admin/color-list');
        }, 1000);
      }
    }
  });

  useEffect(() => {
    if (isSuccess && colorUpdated) {
      toast.success('Brand Updated Successfully');
      navigate('/admin/color-list');
    }
    if (isError && colorUpdated) {
      toast.error('Brand Added Failed');
    }
  }, [isSuccess, isError, colorUpdated]);

  return (
    <div>
        <h3 className="mb-4 title"> {getColId !== undefined ? "Edit" : "Add"} Color</h3>
        <div>
            <form action=""  onSubmit={formik.handleSubmit}>
                <CustomInput type='color' label="Enter Color" value={formik.values.title} name="title" onChange={formik.handleChange("title")} onBlur={formik.handleBlur("title")}/>
                <div className='error'>
                    {formik.touched.title && formik.errors.title ? <div className='text-danger'>{formik.errors.title}</div> : null}
                </div>
                <button className='btn btn-primary border-0 rounded-3 py-3 my-3' type='submit'> {getColId !== undefined ? "Update" : "Add"} Color</button>
            </form>
        </div>
    </div>
  )
}

export default AddColor