import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router';


import InputWithLabel from '../components/userData/InputWithLabel';

import { setUserData, signUp } from "../features/userReducer/userSlice";



const SignUp = () => {
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userReducer);

    const navigate = useNavigate();


    const handleSubmit = async(e) => {
    e.preventDefault();

    if(!username||!email||!password){
        prompt('Nope')
        return
    }
    dispatch(setUserData({ username, email }))
    dispatch(signUp({ username, email , password}))
    navigate("/main");
    };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <InputWithLabel label="Name" id="name" type="name" value={username} setData={setUserName}/>
            <InputWithLabel label="Email" id="email" type="email" value={email} setData={setEmail}/>
            <InputWithLabel label="Password" id="password" type="password" value={password} setData={setPassword}/>

            <button type="submit">Sign Up!</button>
        </form>
    </div>
  )
}

export default SignUp