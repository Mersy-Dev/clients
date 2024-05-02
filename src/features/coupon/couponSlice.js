import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";

const initialState = {
    coupons: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
};


export const getCoupons = createAsyncThunk(
    "coupon/get-coupons",
    async ( thunkAPI) => {
        try {
        return await couponService.getCoupons() ;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const createCoupon = createAsyncThunk(
    "coupon/create-coupon",
    async (coupon, thunkAPI) => {
        try {
            return await couponService.createCoupon(coupon);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
); 

export const getCoupon = createAsyncThunk(
    "coupon/get-coupon",
    async (id, thunkAPI) => {
        try {
            return await couponService.getCoupon(id);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const updateCoupon = createAsyncThunk(
    "coupon/update-coupon",
    async (coupon, thunkAPI) => {
        try {
            return await couponService.updateCoupon(coupon);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }

);

export const deleteCoupon = createAsyncThunk(
    "coupon/delete-coupon",
    async (id, thunkAPI) => {
        try {
            return await couponService.deleteCoupon(id);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);


export const resetCouState = createAction("Reset_all");


export const couponSlice = createSlice({
    name: "coupons",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getCoupons.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getCoupons.fulfilled, (state, action) => { 
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.coupons = action.payload;
        }).addCase(getCoupons.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(createCoupon.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(createCoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.createdCoupon = action.payload;
        }).addCase(createCoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(getCoupon.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getCoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            const { name, expiry, discount } = action.payload;
            state.CoupName = action.payload[0].name;
            state.CoupExp = action.payload[0].expiry;
            state.CoupDis = action.payload[0].discount; 

            // console.log(action.payload);

        }).addCase(getCoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(updateCoupon.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updateCoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.CoupName = action.payload[0].name;
            state.CoupExp = action.payload[0].expiry;
            state.CoupDis = action.payload[0].discount;
        }).addCase(updateCoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(deleteCoupon.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(deleteCoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.deletedCoupon = action.payload;
        }).addCase(deleteCoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(resetCouState, () => initialState);
    }
});

export default couponSlice.reducer; 