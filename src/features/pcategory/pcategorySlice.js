import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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

export const createPcategory = createAsyncThunk(
    "productCategory/create-category",
    async (categoryData, thunkAPI) => {
        try {
            return await pcategoryService.createPcategory(categoryData);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const getPcategoryById = createAsyncThunk(
    "productCategory/get-category",
    async (id, thunkAPI) => {
        try {
            return await pcategoryService.getPcategoryById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const updatePcategory = createAsyncThunk(
    "productCategory/update-category",
    async (categoryData, thunkAPI) => {
        try {
            return await pcategoryService.updatePcategory(categoryData);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const deleteApCategory = createAsyncThunk(
    "productCategory/delete-category",
    async (id, thunkAPI) => {
        try {
            return await pcategoryService.deletePcategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const resetPcatState = createAction("Reset_all");





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
        }).addCase(createPcategory.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(createPcategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.pcategory = action.payload;
        }).addCase(createPcategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(getPcategoryById.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getPcategoryById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.singlePcategory = action.payload.title;
        }).addCase(getPcategoryById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(updatePcategory.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updatePcategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.updatedPcategory = action.payload;
        }).addCase(updatePcategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(deleteApCategory.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(deleteApCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.deletedpcategory = action.payload;
        }).addCase(deleteApCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(resetPcatState, () => initialState);
    }
});

export default pcategorySlice.reducer; 