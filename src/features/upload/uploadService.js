import axios from "axios";
import { base_url } from "../../utils/base_url";    
import {config} from '../../utils/axiosConfig';


const uploadImg = async (data) => {
    const response = await axios.post(`${base_url}upload/`, data, config);
    return response.data;
}

const deleteImg = async (id) => {
    const response = await axios.delete(`${base_url}upload/delete-img/${id}`, {data: {id}, ...config});
    return response.data;
}


export const uploadService = {
    uploadImg,
    deleteImg
}