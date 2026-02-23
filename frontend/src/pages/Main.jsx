import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import AddPost from '../components/userData/AddPost';
import PostsList from '../components/userData/PostsList';
import ChangeData from '../components/settings/ChangeData';


const Main = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.userReducer.user)

  return (
    <div>
        <h1>Hello, {user.username}!</h1>
        <AddPost/>
        <PostsList/>
        <ChangeData/>
    </div>
  )
}

export default Main