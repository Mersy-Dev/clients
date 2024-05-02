import React, { useEffect, useState } from 'react';
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { deleteAbrand, getBrands, resetState } from '../features/brand/brandSlice';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
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
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Actions',
    dataIndex: 'action',
  },
];

const BrandList = () => {
  const [open, setOpen ] = useState(false);
  const [brandId, setBrandId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setBrandId(e);
  };
  const hideModal = () => {
    setOpen(false);
  }
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands())
  }, [dispatch]);
  const brandstate = useSelector(state => state.brand.brands);
  const datas = [];
  for (let i = 0; i < brandstate.length; i++) {
    datas.push({
      key: i + 1,
      title: brandstate[i].title,
      action: (
        <>  
          <Link to={`/admin/brand/${brandstate[i]._id}`}><BiEdit className='text-primary ms-2 me-2 fs-5' /></Link> 
           <button className='text-danger fs-5 bg-transparent border-0' onClick={() => showModal(brandstate[i]._id)}> <AiFillDelete  /> </button>
        </>
      )

    });
  }
  const deleteBrand = (e) => {
    // alert('Brand Deleted Successfully');  
      dispatch(deleteAbrand(e));
      setOpen(false);
      setTimeout(() => {
        dispatch(resetState());
        dispatch(getBrands());
      }, 500);
  }
  return (
    <div>
        <h3 className='mb-4 title'> Brand List</h3>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
        <CustomModals
         title="Are you sure you want to delete the brand ?"
          hideModal={hideModal}
          open={open}
          performAction={() => {deleteBrand(brandId)}}
         />
    </div>
  )
}

export default BrandList