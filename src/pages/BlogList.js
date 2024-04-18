import React,  { useEffect } from 'react';
import { Table } from "antd";
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBlogs } from '../features/blog/blogSlice';

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
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(getBlogs())
  }, [dispatch]);
   const blogstate = useSelector((state) => state.blog.blogs);
    const datas = [];
    for (let i = 0; i < blogstate.length; i++) {
      datas.push({
        key: i,
        title: blogstate[i].title,
        category: blogstate[i].category,
        description: blogstate[i].description,
        action: (
          <>  
            <Link to="/"><BiEdit className='text-primary ms-2 me-2 fs-5' /></Link> 
            <Link> <AiOutlineDelete className='text-danger fs-5' /> </Link>
          </>
        )
      });
    }
  return (
    <div>
        <h3 className='mb-4 title'> Blog List</h3>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
    </div>
  )
}

export default BlogList