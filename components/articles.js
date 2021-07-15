import React from 'react';
import ArticleCard from './articleCard.js'
import styles from '../styles/Home.module.css'

const Articles = ({ articles }) => {
  return (
    <div className={styles.articleGrid}>
      {articles.map(article => {
        return (
          <ArticleCard contentType="article" article={article} key={article.slug}/>
        );
      })}
    </div>
  )
}

export default Articles;