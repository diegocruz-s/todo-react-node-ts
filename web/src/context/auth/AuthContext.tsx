import React, { createContext, useEffect, useState } from 'react'
import { api } from '../../utils/api'

type Props = {
    children: React.ReactNode
}

type ContentAuthContext = {
    loading: boolean
    error: null | string
    login: () => void
    register: () => void
    logout: () => void
    user: object | null
    auth: boolean
}

export const AuthContext = createContext<ContentAuthContext | null>(null)

export function AuthContextProvider ({ children }: Props){

    const [user, setUser] = useState<object | null>(null)
    const [auth, setAuth] = useState<boolean>(false) 

    useEffect(()=>{
        if(user){
            setAuth(true)
        }else {
            setAuth(false)
        }
    }, [user])

    const login = () => {
        console.log('Login')
    }

    const register = () => {
        console.log('Register')
    }

    const logout = () => {
        console.log('logout')
    }

    const contentAuth: ContentAuthContext = {
        loading: false,
        error: null,
        login,
        register, 
        logout,
        auth,
        user
    }

    return (
        <AuthContext.Provider value={ contentAuth }>
            { children }
        </AuthContext.Provider>
    )
}
