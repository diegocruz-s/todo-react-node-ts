import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth/AuthContext'
import { ItemContext } from '../../context/item/ItemContext'
import styles from './Message.module.css'

type Props = {
    msg: string
    type: string
}

function Message({ msg, type }: Props) {

  const [showMessage, setShowMessage] = useState<boolean>(true)
  const datasAuth = useContext(AuthContext)
  const datasItem = useContext(ItemContext)

  useEffect(()=>{
    setTimeout(() => {
        setShowMessage(false)
        datasAuth?.restartStates()
        datasItem?.restartStates()
    }, 2000)
  }, [])

  return (
    <>
        {showMessage && (
            <div className={styles.msg}>
                <h3 className={type==='error' ? styles.error : styles.success}>{msg}</h3>
            </div>
        )}
    </>
    
  )
}

export default Message