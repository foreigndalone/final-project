import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputWithLabel from '../components/userData/InputWithLabel';

import { setUserData, login } from "../features/userReducer/userSlice";



const Login = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userReducer);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!username || !password) {
        alert("Fill both fields");
        return;
      }

      console.log("Submitting:", { username, password });

      const resultAction = await dispatch(login({ username, password }));

      console.log("Login result:", resultAction);

      if (login.fulfilled.match(resultAction)) {
        navigate("/main");
      } else {
        console.log("Login failed:", resultAction.payload);
      }
    };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <InputWithLabel label="Name" id="name" type="text" value={username} setData={setUserName}/>
            <InputWithLabel label="Password" id="password" type="password" value={password} setData={setPassword}/>

            <button type="submit">Login Up!</button>
        </form>
    </div>
  )
}

export default Login