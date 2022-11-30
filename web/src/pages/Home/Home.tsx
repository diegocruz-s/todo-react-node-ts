import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth/AuthContext'
import { ItemContext } from '../../context/item/ItemContext'
import { BsTrash, BsPencil, BsCheckCircleFill, BsCheckCircle } from "react-icons/bs";
import styles from './Home.module.css'
import Message from '../../components/Message/Message';
import FormCreate from './FormCreate';
import { ItemCreate } from '../../interfaces/Item';
import { Link } from 'react-router-dom';

type Props = {}

export default function Home({}: Props) {

  const datasAuth = useContext(AuthContext)
  const datasItem = useContext(ItemContext)

  useEffect(() => {
    datasItem?.listItem()
  }, [])

  const handleDelete = (id: number) => {
    datasItem?.deleteItem(id)
  }

  const handleCreate = (item: ItemCreate) => {
    datasItem?.createItem(item)
  }

  if(datasItem?.loading){
    return (
      <p>Carregando itens...</p>
    )
  }

  const handleCheckItem = (id: number | string, checkItem: boolean) => {
    datasItem?.updateCheckItem(id, !checkItem)
  }

  return (
    <div>
        <div className={styles.headHome}>
          <h1>Home</h1>
          <button onClick={datasAuth?.logout}>Sair</button>
        </div>
        
        { datasItem?.error && (
          <Message msg={datasItem.error} type='error' />
        ) }

        <FormCreate createItem={handleCreate} />

        { datasItem?.success && (
          <Message msg={datasItem.success} type='success' />
        ) }

        { (datasItem?.itemsList && datasItem?.itemsList.length > 0) ? (
          <div className={styles.allItems}>
              <div className={styles.tableDiv}>
                <table>
                  <thead>
                    <tr>
                      <th>#id</th>
                      <th>Título</th>
                      <th>Descrição</th>
                      <th>Feito</th>
                      <th>Editar</th>
                      <th>Deletar</th>
                    </tr>
                  </thead>
                  <tbody>
                    { datasItem?.itemsList.map(item => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td onClick={() => handleCheckItem(item.id, item.checkItem)}>{item.checkItem ? <BsCheckCircleFill /> : <BsCheckCircle />}</td>
                        <td><Link to={`/item/${item.id}`}><BsPencil /></Link></td>
                        <td onClick={() => handleDelete(item.id)}><BsTrash /></td>
                      </tr>
                    )) }
                  </tbody>
                </table>
              </div>
          </div>
        ) : (
          <p>Sem itens na sua lista...</p>
        ) }
    </div>
  )
}