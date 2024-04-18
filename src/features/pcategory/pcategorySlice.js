import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pcategoryService from "./pcategoryService";



const initialState = {
    pcategory: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
};


export const getPcategory = createAsyncThunk(
    "productCategory/get-categories",
    async ( thunkAPI) => {
        try {
        return await pcategoryService.getPcategory() ;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);
export const pcategorySlice = createSlice({
    name: "pcategory",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getPcategory.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getPcategory.fulfilled, (state, action) => { 
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.pcategory = action.payload;
        }).addCase(getPcategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }); 
    }
});

export default pcategorySlice.reducer; 