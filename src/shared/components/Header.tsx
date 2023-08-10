import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';

export default function Header() {
    const [userName, setUsename] = useState('')
    const [avatar, setAvatar] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            let decoded:any = jwtDecode(token);
            setUsename(decoded.username)
            setAvatar(decoded.avatar)
        }
    }, [])

    function logout() {
        localStorage.clear();
        navigate('/login')
    }
    function gotoProfile(){
        navigate('/profile')
    }
    return (
        <div className='app-header'>
            <div className="app-name">
                <a href='/profile'>Profile</a>
                <a href='/notes'>Notes</a>
                <a href='/books-list'>Books</a>
                <a href='/posts-list'>Timeline</a>
            </div>
            <div className="user-info">
                {
                    avatar ?
                    <Avatar src={process.env.REACT_APP_BACKEND_URL + '/image/' + avatar}/>
                    :
                    <Avatar>{userName?.charAt(0)}</Avatar>
                    
                }
                <span>
                    Welcome,
                </span>
                <span  onClick={gotoProfile}>
                    {userName}
                </span>
                <br />
                <span onClick={logout}>Logout</span>
            </div>
        </div>
    )
}
