import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputWithLabel from './InputWithLabel'
import { addPost } from "../../features/postReducer/postSlice";


const AddPost = () => {
    const [post, setPost] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault();
    
        if(!post){
            alert('Nope')
            return
        }
        dispatch(addPost({ post }))
        console.log("WE DID IT")

    };

    return (
    <div>
        <form onSubmit={handleSubmit}>
            <InputWithLabel label="Post" id="post" type="post" value={post} setData={setPost}/>
            <button type='submit'>Make a post</button>
        </form>
    </div>
  )
}

export default AddPost