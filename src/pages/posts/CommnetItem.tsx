import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { commonPostJson } from '../../shared/utils/api-helpers';

export default function CommnetItem({ commentObject, allComments }:any) {
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    const [replyFormVisible, setReplyFormVisible] = useState(false)

    function addReply(data:any) {
        data['replyTo'] = commentObject._id
        commonPostJson('/comments/' + commentObject.postId, data).then(r => {

        })
    }

    return (
        <div className='comment-item-container'>

            <div className='comment-item'>{commentObject.commentText}
                -
                <i>{commentObject.author.username}</i>
                <span className='add-reply-btn' onClick={() => setReplyFormVisible(!replyFormVisible)}>Add Reply</span>
            </div>
            {
                replyFormVisible ? <form className='reply-form' onSubmit={handleSubmit(addReply)}>
                    <TextField {...register('commentText')} label='Write a comment' />
                    <Button variant='contained' type='submit' >Reply</Button >
                </form> : <></>
            }

            <div className='comment-replies-container'>
                {
                    allComments.filter((x:any) => x.replyTo == commentObject._id)
                        .map((x:any) => <CommnetItem commentObject={x} allComments={allComments} />)
                }
            </div>


        </div>
    )
}
