import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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

export const getBrand = createAsyncThunk(
    "brand/get-brand",
    async (id, thunkAPI) => {
        try {
            return await brandService.getBrand(id);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const updateBrand = createAsyncThunk(
    "brand/update-brand",
    async (brand, thunkAPI) => {
        try {
            return await brandService.updateBrand(brand);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const deleteAbrand = createAsyncThunk(
    "brand/delete-brand",
    async (id, thunkAPI) => {
        try {
            return await brandService.deleteBrand(id);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);  

export const resetState = createAction("Reset_all");

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
        }).addCase(getBrand.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getBrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.brandName = action.payload.title;
        }).addCase(getBrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(updateBrand.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updateBrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.updatedBrand = action.payload;
        }).addCase(updateBrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(deleteAbrand.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(deleteAbrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.deletedBrand = action.payload;
        }).addCase(deleteAbrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(resetState, () => initialState);
    }
});

export default brandSlice.reducer; 