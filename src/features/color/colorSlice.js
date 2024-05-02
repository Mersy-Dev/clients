import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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

export const getColor = createAsyncThunk(
    "color/get-color",
    async (id, thunkAPI) => {
        try {
            return await colorService.getColor(id);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const updateColor = createAsyncThunk(
    "color/update-color",
    async (color, thunkAPI) => {
        try {
            return await colorService.updateColor(color);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const deleteAcolor = createAsyncThunk(
    "color/delete-color",
    async (id, thunkAPI) => {
        try {
            return await colorService.deleteColor(id);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);  

export const resetColState = createAction("Reset_all");




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
        }).addCase(getColor.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.colorName = action.payload.title;
        }).addCase(getColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(updateColor.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updateColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.colorUpdated = action.payload;
        }).addCase(updateColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(deleteAcolor.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(deleteAcolor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.colorDeleted = action.payload;
        }).addCase(deleteAcolor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(resetColState, () => initialState);
    }
});

export default colorSlice.reducer; 