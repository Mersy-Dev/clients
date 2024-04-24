import axios from 'axios';
import {base_url} from '../../utils/base_url'; 
import { config } from '../../utils/axiosConfig';




const getColors = async () => {
    const response = await axios.get(`${base_url}color/`);
    return response.data;
};

const createColor = async (colorData) => {
    const response = await axios.post(`${base_url}color/`, colorData, config);
    return response.data;
}


export const colorService = {
    getColors,
    createColor
}



export default colorService;