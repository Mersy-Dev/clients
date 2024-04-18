import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./authService";

const getUserFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    user: getUserFromLocalStorage,
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};

export const login = createAsyncThunk(
    "auth/admin-login",
    async (user, thunkAPI) => {
        try {
        return await authService.login(user);
        } catch (error) {
            return thunkAPI.rejectWithValue({message: error.message})
        }
    }
);

export const getOrders = createAsyncThunk(
    "order/get-orders",
    async (user, thunkAPI) => {
        try {
        return await authService.getOrders();
        } catch (error) {
            return thunkAPI.rejectWithValue({message: error.message})
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        }).addCase(getOrders.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.orders = action.payload;
        });
        builder.addCase(getOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });

    }
}); 

export default authSlice.reducer;
