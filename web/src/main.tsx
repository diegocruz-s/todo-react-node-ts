import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthContextProvider } from './context/auth/AuthContext'
import { ItemContextProvider } from './context/item/ItemContext'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ItemContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ItemContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
