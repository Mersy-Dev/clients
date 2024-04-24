import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadService } from "./uploadService";




const initialState = {
    images: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
};


export const uploadImg = createAsyncThunk(
    "upload/images",
    async (data, thunkAPI) => {
        try {
            const formData = new FormData();
            for(let i = 0; i < data.length; i++){
                formData.append("images", data[i]);
            }
        return await uploadService.uploadImg(formData);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const deleteImg = createAsyncThunk(
    "upload/delete",
    async (id, thunkAPI) => {
        try {
            return await uploadService.deleteImg(id);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const uploadSlice = createSlice({
    name: "images",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(uploadImg.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(uploadImg.fulfilled, (state, action) => { 
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;  
            state.images = action.payload;
        }).addCase(uploadImg.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(deleteImg.pending, (state, action) => {
            state.isLoading = true;
        }
        ).addCase(deleteImg.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.images = [];

        }).addCase(deleteImg.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        });
    }
});

export default uploadSlice.reducer; 