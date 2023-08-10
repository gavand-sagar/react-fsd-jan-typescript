import React, { useEffect, useState } from 'react'
import { commonGetJson, commonPostJson } from '../../shared/utils/api-helpers'
import CommnetItem from './CommnetItem'
import { Button, Skeleton, TextField } from '@mui/material'
import { useForm } from 'react-hook-form';
import Spinner from '../../shared/components/Spinner';

export default function CommentsList({ postId }:any) {
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    const [loading, setLoading] = useState(false)

    const [comments, setComments] = useState([])
    useEffect(() => {

        setLoading(true)
        commonGetJson('/comments/' + postId).then(response => {
            setComments(response)
        }).finally(() => {
            setLoading(false)
        })

    }, [])

    function addComment(data:any) {
        commonPostJson('/comments/' + postId, data).then(r => {
            setComments(r.data)
        })
    }

    return (

        <div className='comments-container'>
            <form className='comment-form' onSubmit={handleSubmit(addComment)}>
                <TextField {...register('commentText')} label='Write a comment' />
                <Button variant='contained' type='submit' >Send</Button >
            </form>
            <hr />
            {
                loading ?
                    <div>
                        <Skeleton height={50} width={300}/>
                        <Skeleton height={50} width={300}/>
                        <Skeleton height={50} width={300}/>
                        <Skeleton height={50} width={300}/>
                    </div>
                    :
                    comments.filter((x:any) => !(x.replyTo))
                        .map(x => <CommnetItem commentObject={x} allComments={comments} />
                        )
            }
        </div>
    )
}
