import React,  { useEffect } from 'react';
import { Table } from "antd";
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteEnquiry, getEnquiries, resetEnqState, updateEnquiry,  } from '../features/enquiry/enquirySlice';
import CustomModals from '../components/CustomModals';
import { toast } from 'react-toastify';


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
  const [open, setOpen] = React.useState(false);
  const [enquiryId, setEnquiryId] = React.useState('');
  const showModal = (e) => {
    setOpen(true);
    setEnquiryId(e);
  };      
  const hideModal = () => {
    setOpen(false);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetEnqState());
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
             <select name="" defaultValue={enquirystate[i].status ? enquirystate[i].status : "Submitted"} onChange={(e)=> setEnquiryStatus(e.target.value, enquirystate[i]._id)} className='form-control form-select' id="">
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
         </>
        ),
        action: (
          <>  
            {/* <Link to="/"><BiEdit className='text-primary ms-2 me-2 fs-5' /></Link>  */}
            <Link to={`/admin/enquiries/${enquirystate[i]._id}`}><AiOutlineEye className='text-success ms-2 me-2 fs-5' /></Link>  
          <button className='text-danger fs-5 bg-transparent border-0' onClick={() => showModal(enquirystate[i]._id)}> <AiOutlineDelete  /> </button>


          </>
        )
      });
    }
    const setEnquiryStatus =(e, i)=>{
      console.log(e, i);
      const data = {
        id: i,
        enqData: e
      };
      dispatch(updateEnquiry(data));
    }

    const deleteEnq = (e) => {
      // alert('Enquiry Deleted Successfully');  
        dispatch(deleteEnquiry(e));
        toast.success('Enquiry deleted Successfully');
        dispatch(resetEnqState());
        setOpen(false);
        setTimeout(() => {
          dispatch(resetEnqState());
          dispatch(getEnquiries());
        }, 500);
    }
  return (
    <div>
        <h3 className='mb-4 title'> Enquiries</h3>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
        <CustomModals
         title="Are you sure you want to delete the enquiry ?"
          hideModal={hideModal}
          open={open}
          performAction={() => {deleteEnq(enquiryId)}}
         />
    </div>
  )
}

export default Enquiries