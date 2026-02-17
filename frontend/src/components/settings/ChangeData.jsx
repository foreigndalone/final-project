import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../features/userReducer/userSlice';
import InputWithLabel from '../userData/InputWithLabel';

const ChangeData = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedData = {};
        if (name.trim() !== '') updatedData.name = name;
        if (email.trim() !== '') updatedData.email = email;
        if (password.trim() !== '') updatedData.password = password;

        if (Object.keys(updatedData).length > 0) {
            dispatch(updateUser(updatedData));
            console.log('User updated:', updatedData);
            console.log(user.name, user.email, user.password)
        } else {
            console.log('No changes to update');
        }
    };

  return (
    <form onSubmit={handleSubmit}>
        <InputWithLabel label="Name" id="name" type="name" value={name} setData={setName}/>
        <InputWithLabel label="Email" id="email" type="email" value={email} setData={setEmail}/>
        <InputWithLabel label="Password" id="password" type="password" value={password} setData={setPassword}/>
        <button type="submit">Update Profile</button>
    </form>
  );
};

export default ChangeData;