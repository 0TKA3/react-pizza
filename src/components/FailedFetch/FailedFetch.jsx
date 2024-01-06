import React from 'react'
import styles from './failedFetch.module.scss'

export default function FailedFetch() {
  return (
    <div className={styles.root}>
      <h1>Что-то пошло не так, пожалуйста перезагрузите страницу.</h1>
    </div>
  )
}
