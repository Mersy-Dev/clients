import React, { useEffect } from 'react';
import { Table } from "antd";
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPcategory } from '../features/pcategory/pcategorySlice';


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


const CategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(getPcategory())
  }, [dispatch]);
   const pcategorystate = useSelector((state) => state.pcategory.pcategory);
    const datas = [];
    for (let i = 0; i < pcategorystate.length; i++) {
      datas.push({
        key: i,
        title: pcategorystate[i].title,
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
        <h3 className='mb-4 title'> Product Categories</h3>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
    </div>
  )
}

export default CategoryList;