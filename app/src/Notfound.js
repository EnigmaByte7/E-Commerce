import React from 'react'
import styles from './lost_styles.module.css'
import cats from './cat.png'
export default function Notfound() {
  return (
    <div className={styles.window}>
      <img src={cats} alt='cats'></img>
      <div className={styles.text}>404! The requested url was not found.</div>
    </div>
  )
}
