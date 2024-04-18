import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";



const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
};


export const getProducts = createAsyncThunk(
    "product/get-products",
    async ( thunkAPI) => {
        try {
        return await productService.getProducts() ;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);
export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getProducts.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getProducts.fulfilled, (state, action) => { 
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.products = action.payload;
        }).addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }); 
    }
});

export default productSlice.reducer; 