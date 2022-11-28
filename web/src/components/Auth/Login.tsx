import React, { useState } from 'react'
import Form from './Form'
import { User } from '../../interfaces/User'

type Props = {}

export default function Login({}: Props) {

  const handleLogin = (user: User) => {
    console.log('Login', user)
  }

  const handleRegister = (user: User) => {
    console.log('Register', user)
  }

  const [formOptionLogin, setFormOptionLogin] = useState(true)

  return (
    <div>
        <div className='btnsOptionsLogin'>

          <button onClick={() => setFormOptionLogin(true)}>
            Login
          </button>

          <button onClick={() => setFormOptionLogin(false)}>
            Register
          </button>

        </div>

        <Form 
          optionLogin={formOptionLogin} 
          handleLogin={handleLogin} 
          handleRegister={handleRegister}
        />

    </div>
  )
}