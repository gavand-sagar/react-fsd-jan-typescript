import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./notesSlice";
import postsSlice from "./postsSlice";

export const store = configureStore({
    reducer: {
        notes: notesSlice.reducer,
        posts: postsSlice.reducer
    }
})