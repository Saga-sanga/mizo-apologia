import React from 'react';
import Card from './card.js'
import styles from '../styles/Home.module.css'

const Article = () => {
  return (
    <div className={styles.grid}>
      <Card />
      <Card />
      <Card />
    </div>
  )
}

export default Article;