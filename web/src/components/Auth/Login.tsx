import React, { useState } from 'react'
import Form from './Form'
import { User } from '../../interfaces/User'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'

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
    <div className={styles.login}>
        <div className={styles.allContentLogin}>
          <div className={styles.btnsOptionsLogin}>
            <button
              onClick={() => setFormOptionLogin(true)} 
              className={formOptionLogin ? styles.active : styles.inactive}
            >
              Login
            </button>

            <button
              onClick={() => setFormOptionLogin(false)} 
              className={formOptionLogin ? styles.inactive : styles.active}
            >
              Register
            </button>
          </div>

          <div className={styles.divForm}>
            <Form 
              optionLogin={formOptionLogin} 
              handleLogin={handleLogin} 
              handleRegister={handleRegister}
            />
          </div>
        </div>
    </div>
  )
}