import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ItemContext } from '../../context/item/ItemContext'
import { Item, ItemCreate } from '../../interfaces/Item'
import styles from './Edit.module.css'
import { Link } from 'react-router-dom'

type Props = {
}

function Edit({}: Props) {

  const datasItem = useContext(ItemContext)
  const { id } = useParams()
  const navigate = useNavigate()

  const [newTitle, setNewTitle] = useState<string>('')
  const [newDescription, setNewDescription] = useState<string>('')

  useEffect(()=>{
    datasItem?.restartStates()
    datasItem?.getItem(id!)

  }, [])

  useEffect(()=>{
    if(datasItem?.item){
      setNewTitle(datasItem.item.title)
      setNewDescription(datasItem.item.description)
    }
  }, [datasItem?.item])  

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!newTitle || !newDescription) return

    const newItemUpdate: ItemCreate = {
      title: newTitle,
      description: newDescription
    }

    datasItem?.updateItem(+id!, newItemUpdate)

    navigate('/')

  }

  return (
    <div>
        <Link to='/'>Voltar</Link>
        { datasItem?.item && (
            <form onSubmit={handleSubmit}>
              <div>
                <input 
                  type="text" 
                  placeholder='Novo título'
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder='Nova descrição'
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>
              
              <button type='submit'>Editar</button>
            </form>
        ) }
    </div>
  )
}

export default Edit