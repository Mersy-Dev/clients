import React,  { useEffect, useState } from 'react';
import { Table } from "antd";
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteBcategory, getBcategories, resetBcatState } from '../features/bcategory/bcategorySlice';
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
    title: 'Actions',
    dataIndex: 'action',
  },
];

const BlogCatList = () => {
  const [open, setOpen ] = useState(false);
  const [bcategoryId, setBcategoryId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setBcategoryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  }
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetBcatState());
     dispatch(getBcategories())

  }, [dispatch]);
   const bcategorystate = useSelector((state) => state.bcategory.bcategory);
    const datas = [];
    for (let i = 0; i < bcategorystate.length; i++) {
      datas.push({
        key: i + 1, 
        title: bcategorystate[i].title,
        action: (
          <>  
            <Link to={`/admin/blog-category/${bcategorystate[i]._id}`}><BiEdit className='text-primary ms-2 me-2 fs-5' /></Link> 
            <button className='text-danger fs-5 bg-transparent border-0' onClick={() => showModal(bcategorystate[i]._id)}> <AiOutlineDelete  /> </button>
          </>
        )
      });
    }

    const deleteBcat = (e) => {
      dispatch(deleteBcategory(e));
      setOpen(false);
      setTimeout(() => {
        dispatch(resetBcatState());
        dispatch(getBcategories());
      }, 500);
    }

  return (
    <div>
        <h3 className='mb-4 title'> Blog Categories</h3>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
        <CustomModals
         title="Are you sure you want to delete the blog category ?"
          hideModal={hideModal}
          open={open}
          performAction={() => {deleteBcat(bcategoryId)}}
         />
    </div>
  )
}

export default BlogCatList