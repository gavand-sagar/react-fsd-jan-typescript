import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import CommentsList from './CommentsList'
import { commonPatchJson } from '../../shared/utils/api-helpers'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function PostItem({ post }:any) {
    const [showComments, setShowComments] = useState(false)
    const [likeCounter,setLikeCounter] = useState(post.likes)
    function likeOrUnlike() {
        commonPatchJson('/likes/' + post._id)
            .then(x => {
                // we have to update post html with new data
                setLikeCounter(x.newLikes)
            })
    }
    return (
        <div className='post-item'>

            <div className='heading'>
                {
                    post?.author?.avatar
                        ? <Avatar src={process.env.REACT_APP_BACKEND_URL + '/image/' + post?.author?.avatar} />
                        : <Avatar>{post.author?.username?.charAt(0)}</Avatar>
                }

                <span>{post.author?.username}</span>
            </div>
            <p>{post.content}</p>

            <div>
                <p style={{'cursor':'pointer'}} onClick={likeOrUnlike}> <FavoriteBorderIcon/>  {likeCounter ? likeCounter : 0}</p>
            </div>
            <p onClick={() => setShowComments(!showComments)}>{showComments ? 'hide' : 'show'} comments</p>
            {
                showComments ? <CommentsList postId={post._id} /> : <></>
            }
        </div>
    )
}
