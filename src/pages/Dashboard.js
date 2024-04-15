import React from 'react';
import { BsArrowDownRight, BsArrowUpLeft } from 'react-icons/bs';
import { Column } from '@ant-design/plots';
import {Button, Table } from "antd";

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
    title: 'Status',
    dataIndex: 'status',
  },
];
const datas = [];
for (let i = 0; i < 46; i++) {
  datas.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}


const Dashboard = () => {
  const data = [
    {
      type: 'Jan',
      sales: 38
    },
    {
      type: 'Feb',
      sales: 52
    },
    {
      type: 'Mar',
      sales: 61
    },
    {
      type: 'Apr',
      sales: 145
    },
    {
      type: 'May',
      sales: 48
    },
    {
      type: 'Jun',
      sales: 75
    },
    {
      type: 'Jul',
      sales: 92
    },
    {
      type: 'Aug',
      sales: 123
    },
    {
      type: 'Sep',
      sales: 84
    },
    {
      type: 'Oct',
      sales: 196
    },
    {
      type: 'Nov',
      sales: 85
    },
    {
      type: 'Dec',
      sales: 105
    },
    

  ];
 const config = {
  data,
  xField: 'type',
  yField: 'sales',
  columnStyle: {
    fill: '#ffd333', // Set the fill color to yellow (#ffd333)
  },
  label: {
    position: 'top', // Change position to a supported value (e.g., 'top')
    style: {
      fill: '#FFFFFF',
      opacity: 1,
    },
  },
  xAxis: {
    label: {
      autoRotate: false,
      autoHide: true,
    },
  },
  meta: {
    type: { alias: 'Months' },
    sales: { alias: 'Income' },
  },
};

  
  

  return (
    <div>
      <h3 className='mb-4 title'>Dashboard </h3>
      <div className=' d-flex align-items-center justify-content-between gap-3'>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div><p className='desc'>Total</p> <h4 className='mb-0 sub-title'>$1100</h4></div>
          <div className='d-flex flex-column align-items-end '>
            <h6><BsArrowDownRight /> 32%</h6>
            <p className='mb-0 desc'>Compare To April 2022</p>
          </div>

        </div>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div><p className='desc'>Total</p> <h4 className='mb-0 sub-title'>$1100</h4></div>
          <div className='d-flex flex-column align-items-end '>
            <h6 className='red'><BsArrowDownRight /> 32%</h6>
            <p className='mb-0 desc'>Compare To April 2022</p>
          </div>

        </div>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div><p className='desc'>Total</p> <h4 className='mb-0 sub-title'>$1100</h4></div>
          <div className='d-flex flex-column align-items-end '>
            <h6 className='green'><BsArrowDownRight /> 32%</h6>
            <p className='mb-0 desc'>Compare To April 2022</p>
          </div>

        </div>
      </div>
      <div className='mt-4'>
        <h3 className='mb-5 title'>Income Statistics </h3>
        <div className="">
          <Column {...config} className='yellow' />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table
            columns={columns}
            dataSource={datas} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard