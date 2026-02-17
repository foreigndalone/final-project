import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
};
const postSlice = createSlice({
    name: "post",
    initialState: initialState,
    reducers: {
        addPost(state, action){
            state.posts.unshift(action.payload);
            console.log("Post added:", state.posts.at(0));
        }
    }
})

export const { addPost } = postSlice.actions;

export default postSlice.reducer;