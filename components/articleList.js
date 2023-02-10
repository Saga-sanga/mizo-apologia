import React from 'react';
import ArticleCard from './articleCard.js'
import styles from '../styles/Home.module.css'

const ArticleList = ({ articles }) => {
  return (
    <div className={styles.articleGrid}>
      {articles.map(article => {
        return (
          <ArticleCard article={article.attributes} key={article.attributes.slug}/>
        );
      })}
    </div>
  )
}

export default ArticleList;