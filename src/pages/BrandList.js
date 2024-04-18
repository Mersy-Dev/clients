import React, { useEffect } from 'react';
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands())
  }, [dispatch]);
  const brandstate = useSelector(state => state.brand.brands);
  const datas = [];
  for (let i = 0; i < brandstate.length; i++) {
    datas.push({
      key: i,
      title: brandstate[i].title,
      action: (
        <>  
          <Link to="/"><BiEdit className='text-primary ms-2 me-2 fs-5' /></Link> 
           <Link> <AiFillDelete className='text-danger fs-5' /> </Link>
        </>
      )

    });
  }
  return (
    <div>
        <h3 className='mb-4 title'> Brand List</h3>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
    </div>
  )
}

export default BrandList