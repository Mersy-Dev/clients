import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CustomerService from "./CustomerService";


const initialState = {
    customers: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
};


export const getUsers = createAsyncThunk(
    "customers/get-customers",
    async ( thunkAPI) => {
        try {
        return await CustomerService.getUsers() ;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);
export const customerSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getUsers.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getUsers.fulfilled, (state, action) => { 
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.customers = action.payload;
        }).addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }); 
    }
});

export default customerSlice.reducer; 