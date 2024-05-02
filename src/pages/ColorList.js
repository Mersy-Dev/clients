import React,  { useEffect, useState } from 'react';
import { Table } from "antd";
import {BiEdit} from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAcolor, getColors, resetColState } from '../features/color/colorSlice';
import {Button, Modal, Form, Input, Space} from 'antd';
import CustomModals from '../components/CustomModals';

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
    title: 'Actions',
    dataIndex: 'action',
  },
];

const ColorList = () => {
  const [open, setOpen ] = useState(false);
  const [colorId, setColorId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setColorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  }



  const dispatch = useDispatch();
   useEffect(() => {
    dispatch(resetColState());
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
          <Link to={`/admin/color/${colorstate[i]._id}`} ><BiEdit className='text-primary ms-2 me-2 fs-5' /></Link> 
          <button className='text-danger fs-5 bg-transparent border-0' onClick={() => showModal(colorstate[i]._id)}> <AiFillDelete  /> </button>

        </>
      )
    });
  }

  const deleteColor = (e) => {
    alert('Color Deleted Successfully');  
      dispatch(deleteAcolor(e));
      setOpen(false);
      setTimeout(() => {
        dispatch(resetColState());
        dispatch(getColors());
      }, 500);
  }
  return (
    <div>
        <h3 className='mb-4 title'> Color List</h3>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
        <CustomModals
         title="Are you sure you want to delete the color ?"
          hideModal={hideModal}
          open={open}
          performAction={() => {deleteColor(colorId)}}
         />
    </div>
  )
}

export default ColorList