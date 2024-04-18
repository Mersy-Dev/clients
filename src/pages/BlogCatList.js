import React,  { useEffect } from 'react';
import { Table } from "antd";
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBcategories } from '../features/bcategory/bcategorySlice';

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
    title: 'Actions',
    dataIndex: 'action',
  },
];

const BlogCatList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(getBcategories())
  }, [dispatch]);
   const bcategorystate = useSelector((state) => state.bcategory.bcategory);
    const datas = [];
    for (let i = 0; i < bcategorystate.length; i++) {
      datas.push({
        key: i, 
        title: bcategorystate[i].title,
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
        <h3 className='mb-4 title'> Blog Categories</h3>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
    </div>
  )
}

export default BlogCatList