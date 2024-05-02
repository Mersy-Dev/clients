import React,  { useEffect } from 'react';
import { Table } from "antd";
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders } from "../features/auth/authSlice";

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
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Actions',
    dataIndex: 'action',
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(getOrders())
  }, [dispatch]);
    const orderState = useSelector((state) => state.auth.orders);
    console.log(orderState);
      const datas = [];
      for (let i = 0; i < orderState.length; i++) {
        datas.push({
          key: i + 1,
          name: orderState[i].orderby.firstName + " " + orderState[i].orderby.lastName,
          product: <Link to={`/admin/order/${orderState[i].orderby._id}`}>View Orders</Link>,
          amount:orderState[i].paymentIntent.amount,
          date: new Date(orderState[i].createdAt).toLocaleString(), 
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
        <h3 className='mb-4 title'> Orders</h3>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
    </div>
  )
}

export default Orders