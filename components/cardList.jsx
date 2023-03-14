import React from 'react';
import styles from '../styles/Home.module.css'

const CardList = ({ children }) => {
  return (
    <div className={styles.answerGrid}>
      {children}
    </div>
  )
}

export default CardList;