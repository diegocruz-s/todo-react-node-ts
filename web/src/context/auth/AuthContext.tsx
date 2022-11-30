import React, { createContext, useEffect, useState } from 'react'
import { User } from '../../interfaces/User'
import { api } from '../../utils/api'

type Props = {
    children: React.ReactNode
}

type UserStorage = {
    user: {
        email: string
        id: number
        name: string
    },
    token: string
}

type ContentAuthContext = {
    loading: boolean
    error: null | string
    login: (user: User) => void
    register: (user: User) => void
    logout: () => void
    restartStates: () => void
    user: UserStorage | null
    auth: boolean
}

export const AuthContext = createContext<ContentAuthContext | null>(null)

export function AuthContextProvider ({ children }: Props){

    const [user, setUser] = useState<UserStorage | null>(null)
    const [auth, setAuth] = useState<boolean>(false) 
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        const userStorage = JSON.parse(localStorage.getItem('user') || '{}')
        
        if(userStorage.user){
            setUser(userStorage)
            return
        } 

    }, [])

    useEffect(()=>{
        if(user){
            setAuth(true)
            api.defaults.headers.authorization = `Bearer ${user.token}`
        }else {
            setAuth(false)
        }
    }, [user])

    const restartStates = () => {
        setError(null)
        setLoading(false)
    }

    const login = async (user: User) => {
        setError(null)
        setLoading(true)
        try {
            const data = await api.post('/auth', user)
                .then(res => { return res.data })
                .catch(err => { return err.response.data })
            
            if(data.error){
                setError(data.error)
                return
            }

            setUser(data)
            localStorage.setItem('user', JSON.stringify(data))
            return

        } catch (error: any) {
            console.log(`Error: ${error.message}`)
        }finally{
            setLoading(false)
        }
    }

    const register = async (user: User) => {
        setError(null)
        setLoading(true)
        try {
            const datas = await api.post('/users', user)
                .then(res => { return res.data })
                .catch(res => { return res.response.data })

            if(datas.error){
                setError(datas.error)
                return
            }

            setUser(datas)
            localStorage.setItem('user', JSON.stringify(datas))
            return

        } catch (error: any) {
            console.log(`Error: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
        restartStates()
        api.defaults.headers.authorization = null
    }

    const contentAuth: ContentAuthContext = {
        loading,
        error,
        login,
        register, 
        logout,
        auth,
        user,
        restartStates
    }

    return (
        <AuthContext.Provider value={ contentAuth }>
            { children }
        </AuthContext.Provider>
    )
}
