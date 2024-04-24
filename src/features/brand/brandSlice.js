import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandService from "./brandService";



const initialState = {
    brands: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
};


export const getBrands = createAsyncThunk(
    "brand/get-brands",
    async ( thunkAPI) => {
        try {
        return await brandService.getBrands() ;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const createBrand = createAsyncThunk(
    "brand/create-brand",
    async (brand, thunkAPI) => {
        try {
            return await brandService.createBrand(brand);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
); 
export const brandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getBrands.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getBrands.fulfilled, (state, action) => { 
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.brands = action.payload;
        }).addCase(getBrands.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(createBrand.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(createBrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.createdBrand = action.payload;
        }).addCase(createBrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        });
    }
});

export default brandSlice.reducer; 