import styles from './Signup.module.css'
import React, { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

export default function Signup() {
  const [ email, setEmail ] = useState('')
  const [ displayName, setDisplayName] = useState('')
  const [ password, setPassword ] = useState('')

  const {signup, isPending, error} = useSignup()

  const handleSubmit =(e) => {
    e.preventDefault();
    signup(email, password, displayName)
    }

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>Signup</h2>
      <label>
        <span>display name:</span>
        <input 
          type='text'
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>
      <label>
        <span>email:</span>
        <input 
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      { !isPending && <button className='btn'>Signup</button>}
      { isPending && <button className='btn' disabled>Loading</button>}
      { error && <p>{error}</p>}
    </form>
  )
}
