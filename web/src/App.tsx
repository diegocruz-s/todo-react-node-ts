import { useState, useContext } from 'react'
import './App.css'
import { AuthContext } from './context/auth/AuthContext'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login'
import Home from './pages/Home/Home'
import Edit from './pages/Edit/Edit'

function App() {

  const datasAuthContext = useContext(AuthContext)

  return (
    <div>
      
      <Routes>
        <Route path='/' element={ datasAuthContext?.auth ? (<Home />) : (<Login />)} />
        <Route path='/item/:id' element={ datasAuthContext?.auth ? (<Edit />) : (<Login />)} />
      </Routes>

    </div>
  )
}

export default App
