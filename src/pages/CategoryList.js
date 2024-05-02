import React, { useEffect, useState } from 'react';
import { Table } from "antd";
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteApCategory, deletePcategory, getPcategory, resetPcatState } from '../features/pcategory/pcategorySlice';
import CustomModals from '../components/CustomModals';
import {Button, Modal, Form, Input, Space} from 'antd';



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
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Actions',
    dataIndex: 'action',
  },
];


const CategoryList = () => {
  const [open, setOpen ] = useState(false);
  const [pCategoryId, setPCategoryId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setPCategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetPcatState());
     dispatch(getPcategory());
  }, [dispatch]);
   const pcategorystate = useSelector((state) => state.pcategory.pcategory);
    const datas = [];
    for (let i = 1; i < pcategorystate.length; i++) {
      datas.push({
        key: i,
        title: pcategorystate[i].title,
        action: (
          <>  
            <Link to={`/admin/category/${pcategorystate[i]._id}`}><BiEdit className='text-primary ms-2 me-2 fs-5' /></Link> 
           <button className='text-danger fs-5 bg-transparent border-0' onClick={() => showModal(pcategorystate[i]._id)}> <AiOutlineDelete  /> </button>

          </>
        )
      });
    }

    const deletePcategory = (e) => {
      // alert('Brand Deleted Successfully');  
        dispatch(deleteApCategory(e));
        setOpen(false);
        setTimeout(() => {
          dispatch(resetPcatState());
          dispatch(getPcategory());
        }, 500);
  
  
    }
  return (
    <div>
        <h3 className='mb-4 title'> Product Categories</h3>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
        <CustomModals 
         title="Are you sure you want to delete this product category ?"
          hideModal={hideModal}
          open={open}
          performAction={() => {deletePcategory(pCategoryId)}}
         />
    </div>
  )
}

export default CategoryList;