import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone';
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBlog, getBlog, resetBstate, updateBlog } from '../features/blog/blogSlice';
import { getBcategories } from '../features/bcategory/bcategorySlice';



let schema = yup.object().shape({
  title: yup.string().required('title is required'),
  description: yup.string().required('description is required'),
  category: yup.string().required('category is required'),

});



const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [images, setImages] = useState([]);
  const [desc, setDesc] = useState(); // Move state initialization here


  // console.log(color);

  useEffect(() => {
        dispatch(resetBstate());
      dispatch(getBcategories());
  }, []);

  const getBlogId = location.pathname.split('/')[3];
  const bcategoryState = useSelector(state => state.bcategory.bcategory);
  const imgState = useSelector(state => state.upload.images);
  const blogCreate = useSelector(state => state.blog);
  const {isSuccess, isError, isLoading, blogsCreated, updatedBlog, blogTitle, blogDescription, blogCategory, BlogImages} = blogCreate;


  useEffect(() => {
        if (getBlogId !== undefined) {
            dispatch(getBlog(getBlogId));
            img.push(BlogImages)
        } else {
            dispatch(resetBstate());
        }   
    }, [getBlogId]);

  const img = [];
  imgState.forEach((i) => {
      img.push({
          public_id: i.public_id,
          url: i.url
      });
  }
  );

  useEffect(() => {
  formik.values.images = img;
  }, [BlogImages]);


  const formik = useFormik({
    enableReinitialize: true,
      initialValues: {
          title: blogTitle || '',
          description: blogDescription || '',
          category: blogCategory || '',
          images: ""
      },  
      validationSchema: schema,
      onSubmit: async values => {
          // alert (JSON.stringify(values, null, 2));
          if(getBlogId !== undefined) {
            const data = {
              id: getBlogId,
              blogData: values
            };
            dispatch(updateBlog(data));
            toast.success('Blog Updated Successfully');
            dispatch(resetBstate());
            navigate('/admin/blog-list');

            } else {
              dispatch(createBlog(values));
                toast.success('Blog Updated Successfully');
              formik.resetForm();
              setTimeout(() => {
                dispatch(resetBstate());
                navigate('/admin/blog-list');
              }, 1000);
            }
      formik.resetForm();
      },
  });

  const handleDesc = (e) => {
    setDesc(e);
};


  return (
    <div>
        <h3 className='mb-4 title'> {getBlogId !== undefined ? "Edit" : "Add"}  Blog</h3>
       
        <div className=''>
            <form action="" onSubmit={formik.handleSubmit} className=' d-flex gap-3 flex-column'>
                    <div className=' mt-4'>
                        <CustomInput type='text' label="Enter Blog Title" value={formik.values.title} name="title" onChange={formik.handleChange("title")} onBlur={formik.handleBlur("title")} />
                    </div>
                    <div className='error'>
                        {formik.touched.title && formik.errors.title ? <div className='text-danger'>{formik.errors.title}</div> : null}
                    </div>
                    <select value={formik.values.category} name="category" onChange={formik.handleChange("category")} onBlur={formik.handleBlur("category")} id="" className='form-control py-3 mt-3'>
                        <option value="">Select Blog Category </option>
                        {bcategoryState.map((i, j) => (
                            <option key={j} value={i.title}> {i.title}</option>
                        ))}
                    </select>
                    <div className='error'>
                        {formik.touched.category && formik.errors.category ? <div className='text-danger'>{formik.errors.category}</div> : null}
                    </div> 
                    <ReactQuill className=' mt-3' theme='snow' value={formik.values.description} name="description" onChange={(value) => formik.setFieldValue("description", value)} onBlur={() => formik.handleBlur("description")} />
                    <div className='error'>
                        {formik.touched.description && formik.errors.description ? <div className='text-danger'>{formik.errors.description}</div> : null}
                    </div>
                    <div className=' bg-white border-1 p-5 text-center mt-3'>
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

                    <div className="showimages d-flex flex-wrap gap-3 mt-3">
                        {imgState.map((i, j) => (
                            <div key={j} className=" position-relative">
                                <button className='btn-close position-absolute' style={{top:"10px", right:"10px"}} type='button' onClick={()=> dispatch(deleteImg(i.public_id))}></button>
                                <img src={i.url} alt="" width={200} height={200}/>
                            </div>
                        ))}
                    </div>
                    <button className='btn btn-primary border-0 rounded-3 py-3 my-5' type='submit'> {getBlogId !== undefined ? "Update" : "Add"} Blog</button>
            </form>
        </div>
    </div>
  )
}

export default AddBlog