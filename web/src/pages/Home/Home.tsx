import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth/AuthContext'

type Props = {}

export default function Home({}: Props) {

  const datasAuth = useContext(AuthContext)

  return (
    <div>
        <h1>Home</h1>
        <button onClick={datasAuth?.logout}>Sair</button>
    </div>
  )
}