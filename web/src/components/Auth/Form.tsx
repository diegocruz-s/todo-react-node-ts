import React, { FormEvent, useEffect, useState } from 'react'
import { User } from '../../interfaces/User'
import styles from './Form.module.css'

type Props = {
  optionLogin: boolean,
  handleLogin: (user: User) => void
  handleRegister: (user: User) => void
}

function Form({ optionLogin, handleLogin, handleRegister }: Props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!email || !password) return 

    if(optionLogin){
      const user = {
        email, password
      }

      handleLogin(user)
    }else {
      if(!name) return

      const user = {
        name, email, password
      }

      handleRegister(user)
    }

    cleanForm()
    
  }

  const cleanForm = ()=>{
    setEmail('')
    setPassword('')
    setName('')
  }

  return (
      <form className={styles.form} onSubmit={handleSubmit}>

        { !optionLogin && (
          <div>
            <input 
              type="text" 
              placeholder='Digite seu nome' 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        ) }
        
        <div>
          <input 
            type="text" 
            placeholder='Digite seu email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input 
            type="password" 
            placeholder='Digite sua senha' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div className={styles.btnsBottomForm}>
          <button type='submit'>
            {optionLogin ? 'Entrar' : 'Registrar'}
          </button>

          <button type='button' onClick={cleanForm}>
            X
          </button>
        </div>
        
      </form>
  )
}

export default Form