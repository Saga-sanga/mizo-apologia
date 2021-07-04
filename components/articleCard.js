import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const ArticleCard = ({ article }) => {
  return (
    <div className={styles.card}>
      <Link as={`/article/${article.slug}`} href="/article/[id]">
        <a>
          <h2>{article.title}</h2>
        </a>
      </Link>
    </div>
  )
}

export default ArticleCard;