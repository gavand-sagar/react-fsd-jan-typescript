import React, { useState } from 'react'
import { commonPostJson } from '../../shared/utils/api-helpers'
import FileUpload from '../../shared/components/FileUpload'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatarFileName] = useState('')

  function signup() {
    let data = { username, password, avatar }
    commonPostJson('/signup', data)
      .then(x => {
        alert('Thank you! your account is created.');
        setPassword('')
        setUsername('')
      })
  }

  function fileUploaded(filename: string) {
    setAvatarFileName(filename)
  }

  return (
    <div>
      <h1>Signup</h1>
      <FileUpload onUpload={fileUploaded} />
      <br />
      <br />
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder='Username' />
      <br />
      <br />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
      <br />
      <br />
      <button onClick={signup}>Signup</button>
    </div>
  )
}
