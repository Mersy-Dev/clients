import axios from 'axios';
import {base_url} from '../../utils/base_url'; 
import { config } from '../../utils/axiosConfig';




const getBcategories = async () => {
    const response = await axios.get(`${base_url}blogcategory/`);
    return response.data;
};

const createBcategory = async (bcategoryData) => {
    const response = await axios.post(`${base_url}blogcategory/`, bcategoryData, config);
    return response.data;
}

const getBcategoryById = async (id) => {
    const response = await axios.get(`${base_url}blogcategory/${id}`);
    return response.data;
}

const updateBcategory = async (bcategoryData) => {
    const response = await axios.put(`${base_url}blogcategory/${bcategoryData.id}`, {title: bcategoryData.bcategoryData.title}, config);
    return response.data;
}

const deleteBcategory = async (id) => {
    const response = await axios.delete(`${base_url}blogcategory/${id}`, config);
    return response.data;
}


export const bcategoryService = {
    getBcategories,
    createBcategory,
    getBcategoryById,
    updateBcategory,
    deleteBcategory
}



export default bcategoryService;