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
    const orderstate = useSelector((state) => state.auth.orders);
      const datas = [];
      for (let i = 0; i < orderstate.length; i++) {
        datas.push({
          key: i + 1,
          name: orderstate[i].orderby.firstName + " " + orderstate[i].orderby.lastName,
          product: orderstate[i].products.map((i, j)=>{
            return (
              <ul key={j}>
                <li className=' list-unstyled'>{i.product.title}</li>
              </ul>
          );
          }),
          amount:orderstate[i].paymentIntent.amount,
          date: new Date(orderstate[i].createdAt).toLocaleString(), 
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