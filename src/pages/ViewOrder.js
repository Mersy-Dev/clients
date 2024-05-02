import React,  { useEffect } from 'react';
import { Table } from "antd";
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getOrderByUserId, getOrders } from "../features/auth/authSlice";

const columns = [
  {
    title: 'sNo',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'Count',
    dataIndex: 'count',
    key: 'count',
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
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

const ViewOrder = () => {
    const location = useLocation();
    const userId = location.pathname.split('/')[3];
    const dispatch = useDispatch();


  useEffect(() => {
     dispatch(getOrderByUserId(userId))
  }, []);


  // const orderState = useSelector((state) => state.auth.ordersByUser.length > 0 ? state.auth.ordersByUser[0].products : []);
  const orderState = useSelector((state) => state.auth.ordersByUser[0].products ? state.auth.ordersByUser[0].products : []);
  console.log(orderState);
  const datas = [];
   for (let i = 0; i < orderState.length; i++) {
       datas.push({
           key: i + 1,
           name: orderState[i].product.title,
           brand: orderState[i].product.brand,
           count: orderState[i].count,
           color: orderState[i].product.color,
           amount: orderState[i].product.price,
           date: orderState[i].product.createdAt,
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
        <h3 className='mb-4 title'> View Orders</h3>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
    </div>
  )
}

export default ViewOrder