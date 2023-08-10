import React, { useEffect, useState } from 'react'
import { commonGetJson, commonPostJson } from '../../shared/utils/api-helpers'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../shared/components/Spinner'
import Loader from '../../shared/components/Loader'
import { Button, TextField } from '@mui/material'
import jwtDecode from 'jwt-decode'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRemeberMe, setIsRememberMe]: any = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('isRememberMe') == "true") {
      let token = localStorage.getItem('token')
      if (token) {
        let decoded: any = jwtDecode(token);
        let expire = decoded.exp * 1000;
        if ((new Date()).getTime() < expire) {
          navigate('/notes')
        } else {
          localStorage.clear()
        }
      }
      else {
        localStorage.clear()
      }
    }

  }, [])

  const navigate = useNavigate()

  function login() {
    setIsLoggingIn(true)
    commonGetJson('/login', { username: username, password: password })
      .then(x => {

        setIsLoggingIn(false)

        console.log({
          Response: x
        })
        if (x.status == true) {
          // navigate user to notes page
          // store token in local storage
          localStorage.setItem('token', x.token)
          localStorage.setItem('isRememberMe', isRemeberMe)
          navigate('/notes')
        } else {
          // clear all controls
          localStorage.clear();
          alert("Login failed!")
        }
      })
  }

  return (
    <div className='login-page-container'>
      <div className='login-form'>
        <h1>Login</h1>
        <TextField value={username} onChange={e => setUsername(e.target.value)} label='Username' variant='outlined' />
        <br />
        <br />
        <TextField value={password} onChange={e => setPassword(e.target.value)} label='Password' variant='outlined' />
        <br />
        <br />
        <label>
          <input type='checkbox' checked={isRemeberMe} onChange={e => setIsRememberMe(e.target.checked)}  ></input>
          Remember Me
        </label>
        <br />
        <br />
        {
          isLoggingIn
            ? <Loader />
            : <Button variant='contained' onClick={login}>Login</Button>
        }
      </div>
    </div>
  )
}
