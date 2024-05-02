import React, { useEffect, useState } from 'react';
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { deleteCoupon, getCoupons, resetCouState } from '../features/coupon/couponSlice';
import { date } from 'yup';
import {Button, Modal, Form, Input, Space} from 'antd';
import CustomModals from '../components/CustomModals';

const columns = [
  {
    title: 'sNo',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Expire',
    dataIndex: 'expiry',
    key: 'expiry',
  },

  {
    title: 'Discount',
    dataIndex: 'discount',
    key: 'discount',
  },
  {
    title: 'Actions',
    dataIndex: 'action',
  },
];

const CouponList = () => {
  const [open, setOpen ] = useState(false);
  const [couponId, setCouponId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setCouponId(e);
  }
  const hideModal = () => {
    setOpen(false);
  }


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetCouState());
    dispatch(getCoupons())
  }, [dispatch]);
  const couponstate = useSelector(state => state.coupon.coupons);
  const datas = [];
  for (let i = 0; i < couponstate.length; i++) {
    datas.push({
      key: i + 1,
      name: couponstate[i].name,
      expiry: new Date(couponstate[i].expiry).toLocaleDateString(),
      discount: couponstate[i].discount,
      action: (
        <>  
          <Link to={`/admin/coupon/${couponstate[i]._id}`}><BiEdit className='text-primary ms-2 me-2 fs-5' /></Link> 
          <button className='text-danger fs-5 bg-transparent border-0' onClick={() => showModal(couponstate[i]._id)}> <AiFillDelete  /> </button>
        </>
      )
    });
  }

  const deleteCoup = (e) => {
    // alert('Brand Deleted Successfully');  
      dispatch(deleteCoupon(e));
      setOpen(false);
      setTimeout(() => {
        dispatch(resetCouState());
        dispatch(getCoupons());
      }, 500);
  }

  return (
    <div>
        <h3 className='mb-4 title'> Coupon List</h3>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
        <CustomModals
         title="Are you sure you want to delete the coupon ?"
          hideModal={hideModal}
          open={open}
          performAction={() => {deleteCoup(couponId)}}
         />
    </div>
  )
} 

export default CouponList