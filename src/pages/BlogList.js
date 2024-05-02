import React,  { useEffect, useState } from 'react';
import { Table } from "antd";
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteBlog, getBlogs, resetBstate } from '../features/blog/blogSlice';
import {Button, Modal, Form, Input, Space} from 'antd';
import CustomModals from '../components/CustomModals';


const columns = [
  {
    title: 'sNo',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Actions',
    dataIndex: 'action',
  },
];

const BlogList = () => {
  const [open, setOpen ] = useState(false);
  const [blogId, setBlogId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setBlogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  }


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetBstate());
     dispatch(getBlogs())
  }, [dispatch]);
   const blogstate = useSelector((state) => state.blog.blogs);
    const datas = [];
    for (let i = 0; i < blogstate.length; i++) {
      datas.push({
        key: i + 1,
        title: blogstate[i].title,
        category: blogstate[i].category,
        description: blogstate[i].description,
        action: (
          <>  
            <Link to={`/admin/add-blog/${blogstate[i]._id}`}><BiEdit className='text-primary ms-2 me-2 fs-5' /></Link> 
            <button className='text-danger fs-5 bg-transparent border-0' onClick={() => showModal(blogstate[i]._id)}> <AiOutlineDelete  /> </button>
          </>
        )
      });
    }

    const delBlog = (e) => {
      // alert('Brand Deleted Successfully');  
        dispatch(deleteBlog(e));
        setOpen(false);
        setTimeout(() => {
          dispatch(resetBstate());
          dispatch(getBlogs());
        }, 500);
    }
  return (
    <div>
        <h3 className='mb-4 title'> Blog List</h3>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
        <CustomModals
         title="Are you sure you want to delete the brand ?"
          hideModal={hideModal}
          open={open}
          performAction={() => {delBlog(blogId)}}
         />
    </div>
  )
}

export default BlogList