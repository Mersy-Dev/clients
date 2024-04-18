import React,  { useEffect } from 'react';
import { Table } from "antd";
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getColors } from '../features/color/colorSlice';

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
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const ColorList = () => {
  const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getColors())
   }, [dispatch])
  const colorstate = useSelector((state) => state.color.colors);
  const datas = [];
  for (let i = 0; i < colorstate.length; i++) {
    datas.push({
      key: i + 1,
      title: colorstate[i].title,
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
        <h3 className='mb-4 title'> Color List</h3>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
    </div>
  )
}

export default ColorList