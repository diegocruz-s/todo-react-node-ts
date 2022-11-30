import React, { useContext, useState } from 'react'
import Form from './Form'
import { User } from '../../interfaces/User'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth/AuthContext'
import Message from '../Message/Message'

type Props = {}

export default function Login({}: Props) {

  const datasAuth = useContext(AuthContext)

  const handleLogin = (user: User) => {
    datasAuth?.login(user)
  }

  const handleRegister = (user: User) => {
    datasAuth?.register(user)
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

          { datasAuth?.error && (
            <Message msg={datasAuth?.error} type='error' />
          ) }

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