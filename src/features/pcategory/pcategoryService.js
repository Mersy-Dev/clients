import axios from 'axios';
import {base_url} from '../../utils/base_url'; 



const getPcategory = async () => {
    const response = await axios.get(`${base_url}category/`);
    return response.data;
};


export const pcategoryService = {
    getPcategory
}



export default pcategoryService;