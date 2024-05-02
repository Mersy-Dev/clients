import axios from 'axios';
import {base_url} from '../../utils/base_url'; 
import { config } from '../../utils/axiosConfig';




const getEnquiries = async () => {
    const response = await axios.get(`${base_url}enquiry/`);
    return response.data;
};

const createEnquiry = async (enquiry) => {
    const response = await axios.post(`${base_url}enquiry/`, enquiry, config);
    return response.data;
};

const getEnquiry = async (id) => {
    const response = await axios.get(`${base_url}enquiry/${id}`);
    return response.data;
};

const updateEnquiry = async (enquiry) => {
    const response = await axios.put(`${base_url}enquiry/${enquiry.id}`, {status:enquiry.enqData}, config);
    return response.data;
}

const deleteEnquiry = async (id) => {
    const response = await axios.delete(`${base_url}enquiry/${id}`, config);
    return response.data;
}


export const enquiryService = {
    getEnquiries,
    createEnquiry,
    getEnquiry,
    updateEnquiry,
    deleteEnquiry
}



export default enquiryService;