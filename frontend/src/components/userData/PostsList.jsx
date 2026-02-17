import React from 'react'
import { useSelector } from 'react-redux';

const PostsList = () => {
    const postsList = useSelector(state => state.postReducer.posts);

    return (
        <div>
            {postsList.map((post, index) => (
                <div key={index}>{post.post}</div>
            ))}
        </div>
    )
}

export default PostsList;