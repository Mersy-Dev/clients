import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { getPcategory } from '../features/pcategory/pcategorySlice';
import { Select } from 'antd';
import { getColors } from '../features/color/colorSlice';
import Dropzone from 'react-dropzone';
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { createProduct } from '../features/product/productSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


let schema = yup.object().shape({
    title: yup.string().required('title is required'),
    description: yup.string().required('description is required'),
    price: yup.number().required('price is required'),
    brand: yup.string().required('brand is required'),
    category: yup.string().required('category is required'),
    tags: yup.string().required('tags is required'),
    color: yup.array().min(1, 'Please select at least one color').required('Color is required'),
    quantity: yup.number().required('quantity is required'),

});

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [color, setColor] = useState([]);
    const [images, setImages] = useState([]);
    const [desc, setDesc] = useState(); // Move state initialization here

    const [brand, setBrand] = useState([]);

    // console.log(color);

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getPcategory());
        dispatch(getColors());
    }, []);

    const brandState = useSelector(state => state.brand.brands);
    const categoryState = useSelector(state => state.pcategory.pcategory);
    const colorState = useSelector(state => state.color.colors);
    const imgState = useSelector(state => state.upload.images);
    const prodCreate = useSelector(state => state.product);
    const {isSuccess, isError, isLoading, createdProduct} = prodCreate;
    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success('Product Added Successfully');
        }
        if (isError) {
            toast.error('Product Added Failed');
        }
    }, [isSuccess, isError, isLoading]);

    const coloropt = [];
    colorState.forEach((i) => {
        coloropt.push({
            label: i.title,
            value: i._id,
        });
    });

    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url
        });
    }
    );

    useEffect(() => {
    formik.values.color = color ? color : "";
    formik.values.images = img;
    }, [color, img]);
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            brand: '',
            category: '',
            tags: '',
            color: [],
            quantity: '',
            images: []
        },  
        validationSchema: schema,
        onSubmit: values => {
            // alert (JSON.stringify(values, null, 2));
            dispatch(createProduct(values));
            formik.resetForm();
            setColor(null);
            toast.success('Product Added Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                navigate('/admin/product-list');
            } , 3000);
        }
    });
    const handleDesc = (e) => {
        setDesc(e);
    };

    const handleColors = (e) => {
        setColor(e);
        // console.log(color);
    }
    return (
        <div>
            <h3 className="mb-4 title">Add Product</h3>

            <div>
                <form onSubmit={formik.handleSubmit} action="" className=' d-flex gap-3 flex-column'>
                    <CustomInput type='text' label="Enter Product Title" value={formik.values.title} name="title" onChange={formik.handleChange("title")} onBlur={formik.handleBlur("title")} />
                    <div className='error'>
                        {formik.touched.title && formik.errors.title ? <div className='text-danger'>{formik.errors.title}</div> : null}
                    </div>
                    <div className='mb-3'>
                        <ReactQuill theme='snow' value={formik.values.description} name="description" onChange={(value) => formik.setFieldValue("description", value)} onBlur={() => formik.handleBlur("description")} />
                    </div>
                    <div className='error'>
                        {formik.touched.description && formik.errors.description ? <div className='text-danger'>{formik.errors.description}</div> : null}
                    </div>
                    <CustomInput type='number' label="Enter Product Price" value={formik.values.price} name="price" onChange={formik.handleChange("price")} onblr={formik.handleBlur("price")} />
                    <div className='error'>
                        {formik.touched.price && formik.errors.price ? <div className='text-danger'>{formik.errors.price}</div> : null}
                    </div>
                    <select value={formik.values.brand} name="brand" onChange={formik.handleChange} onBlur={formik.handleBlur} id="" className='form-control py-3 mb-3'>
                        <option value="">Select Brand </option>
                        {brandState.map((i, j) => (
                            <option key={j} value={i.title}> {i.title}</option>
                        ))}
                    </select>
                    <div className='error'>
                        {formik.touched.brand && formik.errors.brand ? <div className='text-danger'>{formik.errors.brand}</div> : null}
                    </div>
                    <select value={formik.values.category} name="category" onChange={formik.handleChange("category")} onBlur={formik.handleBlur("category")} id="" className='form-control py-3 mb-3'>
                        <option value="">Select Category </option>
                        {categoryState.map((i, j) => (
                            <option key={j} value={i.title}> {i.title}</option>
                        ))}
                    </select>
                    <div className='error'>
                        {formik.touched.category && formik.errors.category ? <div className='text-danger'>{formik.errors.category}</div> : null}
                    </div>  
                    <select value={formik.values.category} name="tags" onChange={formik.handleChange("tags")} onBlur={formik.handleBlur("tags")} id="" className='form-control py-3 mb-3'>
                        <option disabled value="">Select Tags </option>
                        <option value="featured">Featured </option>
                        <option value="popular">Popular </option>
                        <option value="special">Special </option>

                       
                    </select>
                    <div className='error'>
                        {formik.touched.tags && formik.errors.tags ? <div className='text-danger'>{formik.errors.category}</div> : null}
                    </div>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        options={coloropt}
                        className='mb-3 w-100'
                        placeholder="Please select"
                        defaultValue={color}
                        onChange={(i) => handleColors(i)}
                        onBlur={formik.handleBlur("color")}
                    />
                    <div className='error'>
                        {formik.touched.color && formik.errors.color ? <div className='text-danger'>{formik.errors.color}</div> : null}
                    </div>
                    <CustomInput type='number' label="Enter Product Quantity" value={formik.values.quantity} name="quantity" onChange={formik.handleChange("quantity")} onBlur={formik.handleBlur("quantity")} />
                    <div className='error'>
                        {formik.touched.quantity && formik.errors.quantity ? <div className='text-danger'>{formik.errors.quantity}</div> : null}
                    </div>
                    <div className=' bg-white border-1 p-5 text-center'>
                        <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()} className='border-0 rounded-3 bg-light p-5 text-center'>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap gap-3">
                        {imgState.map((i, j) => (
                            <div key={j} className=" position-relative">
                                <button className='btn-close position-absolute' style={{top:"10px", right:"10px"}} type='button' onClick={()=> dispatch(deleteImg(i.public_id))}></button>
                                <img src={i.url} alt="" width={200} height={200}/>
                            </div>
                        ))}
                    </div>

                    <button className='btn btn-primary border-0 rounded-3 py-3 my-3' type='submit'> Add Product</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct 