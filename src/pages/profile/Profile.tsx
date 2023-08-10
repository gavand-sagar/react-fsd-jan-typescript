import { Button, TextField } from '@mui/material'
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react'
import { commonGetJson, commonPatchJson } from '../../shared/utils/api-helpers';
import FileUpload from '../../shared/components/FileUpload';

export default function Profile() {

    const [avatar, setAvatarFileName] = useState('')
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        commonGetJson('/profile')
            .then(response => {
                setValue('username', response.username)
                setValue('password', response.password)
            })
    }, [])

    function update(formData:any) {
        formData["avatar"] = avatar
        commonPatchJson('/profile', formData).then(response => {
            if (response.success) {
                alert("Updated")
            } else {
                alert(response.message)
            }
        })
    }

    function fileUploaded(filename:string) {
        setAvatarFileName(filename)
    }

    return (
        <>
            <div>Profile</div>
            <br />
            <br />

            <FileUpload onUpload={fileUploaded} />
            <form onSubmit={handleSubmit(update)}>
                <TextField {...register("username")} label="Username" />
                <br />
                <br />
                <TextField {...register("password")} label="New Password" />
                <br />
                <br />
                <Button type='submit' variant='contained'>Update</Button>
            </form>

        </>
    )
}
