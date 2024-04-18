import React, { useEffect } from 'react';
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customers/CustomerSlice';

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
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Mobile Number',
    dataIndex: 'mobile',
    key: 'mobile',
  },
];


const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const customerstate = useSelector(state => state.customer.customers);
  const datas = [];
  for (let i = 0; i < customerstate.length; i++) {
    if(customerstate[i].role !== 'admin'){
      datas.push({
        key: i + 1,
        name: customerstate[i].firstName + ' ' + customerstate[i].lastName,
        email: customerstate[i].email,
        mobile: customerstate[i].mobile
      })
    }
  }
  
  
  return (
    <div>
        <h3 className='mb-4 title'> Customers</h3>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
    </div>
  )
}

export default Customers