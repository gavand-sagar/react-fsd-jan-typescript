import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commonGetJson, commonPostJson } from "../shared/utils/api-helpers";

export const getAllPosts:any = createAsyncThunk('getAllPosts', async () => {
    return commonGetJson('/posts')
})


export const createNewPost:any = createAsyncThunk('createNewPost', async (data) => {
    return commonPostJson('/posts', data)
})



const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        isPostLoading: false,
        isPostBeingSaved: false
    },
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getAllPosts.pending, (state, action) => {
            state.isPostLoading = true;
        })
        builder.addCase(getAllPosts.fulfilled, (state: any, action) => {
            state.isPostLoading = false;
            state.posts = [...action.payload]
        })
        builder.addCase(getAllPosts.rejected, (state, action) => {
            state.isPostLoading = false;
        })

        builder.addCase(createNewPost.pending, (state, action) => {
            state.isPostBeingSaved = true
        })
        builder.addCase(createNewPost.fulfilled, (state, action) => {
            state.isPostBeingSaved = false;
            // state.posts = [...action.payload]
        })
        builder.addCase(createNewPost.rejected, (state, action) => {
            state.isPostLoading = false;
        })

    }
})


export default postsSlice;