import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { getAenquiry, getEnquiry, resetEnqState, updateEnquiry } from '../features/enquiry/enquirySlice';
import { BiArrowBack } from 'react-icons/bi';

const ViewEnq = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const enquiryId = location.pathname.split('/')[3];
  const enqState = useSelector(state => state.enquiry);
  const { EnqName, EnqEmail, EnqMobile, EnqComment, EnqStatus } = enqState;


  useEffect(() => {
    dispatch(getAenquiry(enquiryId));
  }, [enquiryId]);
  const goBack = () => {
    navigate('/admin/enquiries');
  }


  const setEnquiryStatus =(e, i)=>{
    console.log(e, i);
    const data = {
      id: i,
      enqData: e
    };
    dispatch(updateEnquiry(data));
    dispatch(resetEnqState());
    setTimeout(() => {
      dispatch(getAenquiry(enquiryId));
    }, 1000);
  }
  return (
    <div>
      <div className=' d-flex justify-content-between align-items-center'>
        <h3 className='mb-4 title'> View Equiry </h3>
        <button className='btn btn-primary fs-6 mb-0 d-flex align-items-center gap-1' onClick={goBack}>
          <BiArrowBack className='fs-6 ' />
          Back</button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex gap-3 rounded-3 flex-column">
        <div className="d-flex align-items-center gap-3">
          <h6 className="text-muted">Name:</h6>
          <p className='mb-1'>{EnqName}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="text-muted">Email:</h6>
          <p className='mb-1'>
            <a href={`mailto:${EnqEmail}`}>{EnqEmail}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="text-muted">Mobile:</h6>
          <p className='mb-1'>
            <a href={`tel:+234${EnqMobile}`}>{EnqMobile}</a>
          </p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h6 className="text-muted">Comment:</h6>
          <p className='mb-1'> {EnqComment} </p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h6 className="text-muted">Status:</h6>
          <p className='mb-1'> {EnqStatus} </p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h6 className="text-muted">Change Status:</h6>
          <div>
            <select name="" value={EnqStatus ? EnqStatus : "Submitted"} className='form-control form-select' id="" onChange={(e)=> setEnquiryStatus(e.target.value, enquiryId)} >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>





      </div>
    </div>
  )
}

export default ViewEnq