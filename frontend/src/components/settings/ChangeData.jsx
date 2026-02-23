import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeData, updateUser } from '../../features/userReducer/userSlice';
import InputWithLabel from '../userData/InputWithLabel';

const ChangeData = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  // подтягиваем из стейта существующие данные
  const [username, setUsername] = useState(user.username || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setUsername(user.username || '');
    setEmail(user.email || '');
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // формируем объект для апдейта, включая id
    const updatedData = { id: Number(user.id) };
    if (username.trim() !== '') updatedData.username = username;
    if (email.trim() !== '') updatedData.email = email;
    if (password.trim() !== '') updatedData.password = password;

    if (Object.keys(updatedData).length > 1) { // >1, потому что id всегда есть
      dispatch(updateUser(updatedData));
      dispatch(changeData(updatedData));
      console.log("SENDING:", updatedData);
      
      console.log('User updated:', updatedData);
    } else {
      console.log('No changes to update');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputWithLabel label="Username" id="username" type="text" value={username} setData={setUsername} />
      <InputWithLabel label="Email" id="email" type="email" value={email} setData={setEmail} />
      <InputWithLabel label="Password" id="password" type="password" value={password} setData={setPassword} />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ChangeData;