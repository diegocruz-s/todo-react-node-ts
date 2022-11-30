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
    <div className={styles.divFormCreate}>
        <form className={styles.formCreate} onSubmit={handleSubmit}>
            <div className={styles.componentForm}>
                <input 
                    type="text"
                    placeholder='Título'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className={styles.componentForm}>
                <input 
                    type="text"
                    placeholder='Descrição'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <button type='submit'>+</button>
        </form>
    </div>
    
  )
}

export default FormCreate