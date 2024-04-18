import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bcategoryService from "./bcategoryService";



const initialState = {
    bcategory: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
};


export const getBcategories = createAsyncThunk(
    "blogCategory/get-categories",
    async ( thunkAPI) => {
        try {
        return await bcategoryService.getBcategories() ;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);
export const bcategorySlice = createSlice({
    name: "bcategory",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getBcategories.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getBcategories.fulfilled, (state, action) => { 
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.bcategory = action.payload;
        }).addCase(getBcategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }); 
    }
});

export default bcategorySlice.reducer; 