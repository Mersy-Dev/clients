import React from 'react';
import { Table } from "antd";
import {BiEdit} from 'react-icons/bi';
import {AiFillDelete} from 'react-icons/ai'

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

const ProductList = () => {
  return (
    <div>
        <h3 className='mb-4 title'> Product List</h3>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
    </div>
  )
}

export default ProductList