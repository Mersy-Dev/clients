    import React, { useEffect, useState } from 'react'
    import CustomInput from '../components/CustomInput'
    import { useDispatch, useSelector } from 'react-redux';
    import { useLocation, useNavigate } from 'react-router-dom';
    import { useFormik } from 'formik';
    import * as yup from 'yup';
    import { toast } from 'react-toastify';
    import { createCoupon, getCoupon, resetCouState, updateCoupon } from '../features/coupon/couponSlice';


    let schema = yup.object().shape({
        name: yup.string().required('Coupon name is required'),
        expiry: yup.date().required('Coupon expiry is required'),
        discount: yup.number().required('Coupon discount is required'),

    });

    const AddCoupon = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const location = useLocation();

        const getCoupId = location.pathname.split('/')[3];
        console.log(getCoupId);
        const coupCreate = useSelector(state => state.coupon);
        const { isSuccess, isError, createdCoupon, CoupName, CoupExp, CoupDis } = coupCreate;
        
        const changDateFormat = (date) => {
            const newDate = new Date(date);
            const year = newDate.getFullYear();
            const month = String(newDate.getMonth() + 1).padStart(2, '0');
            const day = String(newDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        // console.log(changDateFormat(getCoupExp));
        useEffect(() => {
            if (getCoupId !== undefined) {
                dispatch(getCoupon(getCoupId));
            } else {
                dispatch(resetCouState())
            }
        }, [getCoupId]);

        // useEffect(() => {
        //     if (isSuccess && createdCoupon) {
        //         toast.success('coupon Added Successfully');
        //     }
        //     if (isSuccess && getCoupName && getCoupExp && getCoupDis) {
        //         toast.success('coupon Updated Successfully');
        //         navigate('/admin/coupon-list');
        //     }
        //     if (isError && getCoupName && getCoupExp && getCoupDis) {
        //         toast.error('coupon Added Failed');
        //     }
        // }, [isSuccess, isError, getCoupName, getCoupExp, getCoupDis]);



        const formik = useFormik({
            enableReinitialize: true,
            initialValues: {
                name: CoupName || '',
                expiry: changDateFormat(CoupExp) || '',
                discount: CoupDis || '',

            },
            validationSchema: schema,
            onSubmit: values => { 
                if (getCoupId !== undefined) {
                    const data = {
                        id: getCoupId,
                        couponData: values
                    };
                    dispatch(updateCoupon(data));
                    toast.success('coupon Updated Successfully');
                    dispatch(resetCouState());
                    navigate('/admin/coupon-list');

                } else {
                    dispatch(createCoupon(values));
                    toast.success('coupon Added Successfully');
                    formik.resetForm();
                    setTimeout(() => {
                        dispatch(resetCouState());
                        navigate('/admin/coupon-list');
                    }, 1000);
                }
            },
        });


        return (
            <div>
                <h3 className="mb-4 title">{getCoupId !== undefined ? "Edit" : "Add"} Coupon </h3>
                <div>
                    <form action="" onSubmit={formik.handleSubmit} >
                        <CustomInput type='text' label="Enter coupon name" value={formik.values.name} name="name" onChange={formik.handleChange("name")} onBlur={formik.handleBlur("name")} id="name" />
                        <div className='error'>
                            {formik.touched.name && formik.errors.name ? <div className='text-danger'>{formik.errors.name}</div> : null}
                        </div>
                        <CustomInput type='date' label="Enter coupon expiry Date" value={formik.values.expiry} name="expiry" onChange={formik.handleChange("expiry")} onBlur={formik.handleBlur("expiry")} id="expiry" />
                        <div className='error'>
                            {formik.touched.expiry && formik.errors.expiry ? <div className='text-danger'>{formik.errors.expiry}</div> : null}
                        </div>
                        <CustomInput type='number' label="Enter coupon discount" value={formik.values.discount} name="discount" onChange={formik.handleChange("discount")} onBlur={formik.handleBlur("discount")} id="discount" />
                        <div className='error'>
                            {formik.touched.discount && formik.errors.discount ? <div className='text-danger'>{formik.errors.discount}</div> : null}
                        </div>

                        <button className='btn btn-primary border-0 rounded-3 py-3 my-3' type='submit'> {getCoupId !== undefined ? "Update" : "Add"}  Coupon Bonus</button>
                    </form>
                </div>
            </div>
        )
    }

    export default AddCoupon

