import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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
    async (thunkAPI) => {
        try {
            return await bcategoryService.getBcategories();
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message })
        }
    }
);
export const createBcategory = createAsyncThunk(
    "blogCategory/create-category",
    async (bcategoryData, thunkAPI) => {
        try {
            return await bcategoryService.createBcategory(bcategoryData);
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message })
        }
    }
);

export const getBcategoryById = createAsyncThunk(
    "blogCategory/get-category",
    async (id, thunkAPI) => {
        try {
            return await bcategoryService.getBcategoryById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message })
        }
    }
);

export const updateBcategory = createAsyncThunk(
    "blogCategory/update-category",
    async (bcategoryData, thunkAPI) => {
        try {
            return await bcategoryService.updateBcategory(bcategoryData);
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message })
        }
    }
);

export const deleteBcategory = createAsyncThunk(
    "blogCategory/delete-category",
    async (id, thunkAPI) => {
        try {
            return await bcategoryService.deleteBcategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message })
        }
    }
);

export const resetBcatState = createAction("Reset_all");


export const bcategorySlice = createSlice({
    name: "bcategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
        }).addCase(createBcategory.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(createBcategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.bcategoryCreated = action.payload;
        }).addCase(createBcategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;

        }).addCase(getBcategoryById.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getBcategoryById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.singleBcategory = action.payload.title;
        }).addCase(getBcategoryById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(updateBcategory.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updateBcategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.updatedBcategory = action.payload;
        }).addCase(updateBcategory.rejected, (state, action) => {   
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(deleteBcategory.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(deleteBcategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.deletedBcategory = action.payload;
        }).addCase(deleteBcategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(resetBcatState, () => initialState);
    }
});

export default bcategorySlice.reducer; 