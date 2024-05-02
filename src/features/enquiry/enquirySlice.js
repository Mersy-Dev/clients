import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";



const initialState = {
    enquiries: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
};


export const getEnquiries = createAsyncThunk(
    "enquiry/get-enquiries",
    async ( thunkAPI) => {
        try {
        return await enquiryService.getEnquiries() ;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const createEnquiry = createAsyncThunk(
    "enquiry/create-enquiry",
    async (enquiry, thunkAPI) => {
        try {
            return await enquiryService.createEnquiry(enquiry);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const getAenquiry = createAsyncThunk(
    "enquiry/get-enquiry",
    async (id, thunkAPI) => {
        try {
            return await enquiryService.getEnquiry(id);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const updateEnquiry = createAsyncThunk(
    "enquiry/update-enquiry",
    async (enquiry, thunkAPI) => {
        try {
            return await enquiryService.updateEnquiry(enquiry);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const deleteEnquiry = createAsyncThunk(
    "enquiry/delete-enquiry",
    async (id, thunkAPI) => {
        try {
            return await enquiryService.deleteEnquiry(id);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const resetEnqState = createAction("Reset_all");



export const enquirySlice = createSlice({
    name: "enquiries",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getEnquiries.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getEnquiries.fulfilled, (state, action) => { 
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.enquiries = action.payload;
        }).addCase(getEnquiries.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(createEnquiry.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(createEnquiry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.enquiries = action.payload;
        }).addCase(createEnquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(getAenquiry.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getAenquiry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.EnqName = action.payload.name;
            state.EnqEmail = action.payload.email;
            state.EnqMobile = action.payload.mobile;
            state.EnqComment = action.payload.comment;
            state.EnqStatus = action.payload.status;

        }).addCase(getAenquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(updateEnquiry.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updateEnquiry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.updatedEnquiry = action.payload;
        }).addCase(updateEnquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(deleteEnquiry.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(deleteEnquiry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.enquiries = state.enquiries.filter((enquiry) => enquiry.id !== action.payload.id);
        }).addCase(deleteEnquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(resetEnqState, () => initialState);
    }
});

export default enquirySlice.reducer; 