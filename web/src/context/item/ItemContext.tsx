import React, { createContext, useState } from "react";
import { api } from "../../utils/api";
import { Item, ItemCreate } from '../../interfaces/Item'

type ItemContextValue = {
    listItem: () => void
    restartStates: () => void
    deleteItem: (id: number) => void
    getItem: (id: number | string) => void
    createItem: (item: ItemCreate) => void
    updateItem: (id: number | string, item: ItemCreate) => void
    updateCheckItem: (id: number | string, checkItem: boolean) => void
    itemsList: Item[] | undefined
    item: Item | null
    success: string | null
    error: string | null
    loading: boolean
}

type Props = {
    children: React.ReactNode
}

export const ItemContext = createContext<ItemContextValue | null>(null)

export const ItemContextProvider = ({ children }: Props) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [itemsList, setItemsList] = useState<Item[] | undefined>(undefined)
    const [item, setItem] = useState<Item | null>(null)

    const restartStates = () => {
        setLoading(false)
        setError(null)
        setSuccess(null)
        setItem(null)
    }

    const listItem = async () => {
        setLoading(true)
        try {
            const datas = await api.get('/item')
                .then(res => { return res.data.items })

            setItemsList(datas)
            return
        } catch (error: any) {
            console.log(`Error: ${error.message}`)
        }finally{
            setLoading(false)
        }
        
    }

    const deleteItem = async (id: number) => {
        console.log('id', id)

        const data = await api.delete(`/item/${id}`)
            .then(res => { return res.data })
        console.log(data)

        if(data.message){
            setSuccess(data.message)
        }

        const listFilter = itemsList?.filter(item => {
            return item.id !== id
        })

        setItemsList(listFilter)

    }

    const createItem = async (item: ItemCreate) => {
        const data = await api.post('/item', item)
            .then(res => { return res.data })
            .catch(err => { return err.response.data })

        if(data.error){
            setError(data.error)
            return
        }

        setSuccess(data.message)
        if((itemsList && itemsList?.length > 0)){
            const newList = [...itemsList, data.item]
            setItemsList(newList)
        }else{
            setItemsList([data.item])
        }
    }

    const getItem = async (id: number | string) => {
        const data = await api.get(`/item/${+id}`)
            .then(res => { return res.data.item })
        
        setItem(data)
    }

    const updateCheckItem = async (id: number | string, checkItem: boolean) => {
        try {
            await api.patch(`/item/checkitem/${+id}`, { valueCheck: checkItem })
            const updateList = itemsList?.map(item => {
                if(item.id === +id){
                    item.checkItem = checkItem
                }

                return item
            })

            setItemsList(updateList)
        } catch (error: any) {
            console.log(`Error: ${error.message}`)
        }
    }

    const updateItem = async (id: number | string, item: ItemCreate) => {
        const data = await api.patch(`/item/${id}`, item)
            .then(res => { return res.data })
            .catch(err => { return err.response.data })
        
        if(data.error){
            setError(data.error)
            return
        }

        setSuccess(data.message)
        const listUpdate = itemsList?.map(actualItem => {
            if(actualItem.id === +id){
                actualItem.title = item.title
                actualItem.description = item.description
            }

            return actualItem
        })

        setItemsList(listUpdate)

    }

    const contentItem: ItemContextValue = {
        listItem,
        itemsList,
        deleteItem,
        success,
        restartStates,
        createItem,
        error,
        loading,
        getItem,
        item,
        updateCheckItem,
        updateItem
    }

    return(
        <ItemContext.Provider value={ contentItem }>
            { children }
        </ItemContext.Provider>
    )
}
