import React, { FormEvent, useState } from 'react'
import { ItemCreate } from '../../interfaces/Item'
import styles from './FormCreate.module.css'

type Props = {
    createItem: (item: ItemCreate) => void 
}

function FormCreate({ createItem }: Props) {

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!title || !description) return
    
    const item: ItemCreate = {
        title,
        description
    }

    createItem(item)
    setTitle('')
    setDescription('')

  }

  return (
    <form className='formCreate' onSubmit={handleSubmit}>
        <div className="componentForm">
            <input 
                type="text"
                placeholder='Título'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div className="componentForm">
            <input 
                type="text"
                placeholder='Descrição'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>

        <button type='submit'>+</button>
    </form>
  )
}

export default FormCreate