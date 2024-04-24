import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorService from "./colorService";


const initialState = {
    colors: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
};


export const getColors = createAsyncThunk(
    "color/get-colors",
    async ( thunkAPI) => {
        try {
        return await colorService.getColors() ;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const createColor = createAsyncThunk(
    "color/create-color",
    async (colorData, thunkAPI) => {
        try {
            return await colorService.createColor(colorData);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);



export const colorSlice = createSlice({
    name: "colors",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getColors.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getColors.fulfilled, (state, action) => { 
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.colors = action.payload;
        }).addCase(getColors.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(createColor.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(createColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.colorsCreated = action.payload;
        }).addCase(createColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        });
    }
});

export default colorSlice.reducer; 