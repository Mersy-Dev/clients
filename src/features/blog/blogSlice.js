import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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

export const getBlog = createAsyncThunk(
    "blog/get-blog",
    async (id, thunkAPI) => {
        try {
            return await blogService.getBlog(id);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const updateBlog = createAsyncThunk(
    "blog/update-blog",
    async (blog, thunkAPI) => {
        try {
            return await blogService.updateBlog(blog);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);

export const deleteBlog = createAsyncThunk(
    "blog/delete-blog",
    async (id, thunkAPI) => {
        try {
            return await blogService.deleteBlog(id);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
);


export const resetBstate = createAction("Reset_all");


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
        }).addCase(getBlog.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.blogTitle = action.payload.title
            state.blogDescription = action.payload.description;
            state.blogCategory = action.payload.category;
            state.blogImages = action.payload.images;
        }).addCase(getBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(updateBlog.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updateBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.updatedBlog = action.payload;
        }).addCase(updateBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(deleteBlog.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(deleteBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.deletedBlog = action.payload;
        }).addCase(deleteBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        }).addCase(resetBstate, () => initialState);
    }
});

export default blogSlice.reducer; 