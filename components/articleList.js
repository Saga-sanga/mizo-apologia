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
      }) : <p className='min-h-[23vh]'>He Category ah hian Thuziak a om lo!</p>}
    </div>
  )
}

export default ArticleList;