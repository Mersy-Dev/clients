import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";   
import customerReducer from "../features/customers/CustomerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import pcategoryReducer from "../features/pcategory/pcategorySlice";
import bcategoryReducer from "../features/bcategory/bcategorySlice";
import blogReducer from "../features/blog/blogSlice"; 
import colorReducer from "../features/color/colorSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";



export const store = configureStore({
    reducer: {
        auth: authReducer, 
        customer: customerReducer,
        product: productReducer,
        brand: brandReducer,
        pcategory: pcategoryReducer ,
        blog: blogReducer,
        bcategory: bcategoryReducer ,
        color: colorReducer,
        enquiry: enquiryReducer,    
    },
    });
    