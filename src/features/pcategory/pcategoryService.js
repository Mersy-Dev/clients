import axios from 'axios';
import {base_url} from '../../utils/base_url'; 
import { config } from '../../utils/axiosConfig';


const getPcategory = async () => {
    const response = await axios.get(`${base_url}category/`);
    return response.data;
};

const createPcategory = async (category) => {   
    const response = await axios.post(`${base_url}category/`, category, config);
    return response.data;
}

const getPcategoryById = async (id) => {
    const response = await axios.get(`${base_url}category/${id}`);
    return response.data;
}

const updatePcategory = async (category) => {
    const response = await axios.put(`${base_url}category/${category.id}`, {title: category.categoryData.title}, config);
    return response.data;
}

const deletePcategory = async (id) => {
    const response = await axios.delete(`${base_url}category/${id}`, config);
    return response.data;
}



export const pcategoryService = {
    getPcategory,
    createPcategory,
    getPcategoryById,
    updatePcategory,
    deletePcategory
}



export default pcategoryService;