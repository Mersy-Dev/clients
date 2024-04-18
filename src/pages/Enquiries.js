import React,  { useEffect } from 'react';
import { Table } from "antd";
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEnquiries } from '../features/enquiry/enquirySlice';

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
    sorter: { 
      compare: (a, b) => a.name.length - b.name.length,
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
    key: 'comment',
  },

  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Actions',
    dataIndex: 'action',
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(getEnquiries())
  }, [dispatch]);
   const enquirystate = useSelector((state) => state.enquiry.enquiries);
    const datas = [];
    for (let i = 0; i < enquirystate.length; i++) {
      datas.push({
        key: i + 1,
        name: enquirystate[i].name,
        email: enquirystate[i].email,
        mobile: enquirystate[i].mobile,
        comment: enquirystate[i].comment,
        status: (
          <>  
            <select className='form-control form-select' name="" id="">
              <option value="">Set Status</option>
            </select>
         </>
        ),
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
        <h3 className='mb-4 title'> Enquiries</h3>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
    </div>
  )
}

export default Enquiries