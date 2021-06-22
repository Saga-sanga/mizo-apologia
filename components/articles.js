import React from 'react';
import Card from './card.js'
import styles from '../styles/Home.module.css'

const Articles = ({ articles }) => {
  console.log(articles);
  return (
    <div className={styles.grid}>
      {articles.map(article => {
        return (
          <Card article={article} key={article.slug}/>
        );
      })}
    </div>
  )
}

export default Articles;