import React from 'react';
import ArticleCard from './articleCard.js'
import styles from '../styles/Home.module.css'

const ArticleList = ({ articles }) => {
  return (
    <div className={styles.articleGrid}>
      { articles.length ?
        articles.map(article => {
        return (
          <ArticleCard article={article.attributes} key={article.attributes.slug}/>
        );
      }) : <h1 className='min-h-[23vh]'>He Category ah hian Thuziak a om lo!</h1>}
    </div>
  )
}

export default ArticleList;