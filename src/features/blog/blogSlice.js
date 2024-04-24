import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";



const initialState = {
    blogs: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
};


export const getBlogs = createAsyncThunk(
    "blog/get-blogs",
    async ( thunkAPI) => {
        try {
        return await blogService.getBlogs() ;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);
export const createBlog = createAsyncThunk(
    "blog/create-blog",
    async (blog, thunkAPI) => {
        try {
            return await blogService.createBlog(blog);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getBlogs.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getBlogs.fulfilled, (state, action) => { 
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.blogs = action.payload;
        }).addCase(getBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(createBlog.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(createBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.blogsCreated = action.payload;
        }).addCase(createBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        });
    }
});

export default blogSlice.reducer; 