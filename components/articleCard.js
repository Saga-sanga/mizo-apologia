import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Image from '../components/image';
import Moment from 'react-moment';
// import NextImage from 'next/image';
import { getStrapiURL } from '../lib/api';

const ArticleCard = ({ article }) => {
  return (
    <Link as={`/article/${article.slug}`} href="/article/[id]">
      <a>
        <div className={`${styles.articleCard} nav-shadow`}>
          <div>
            <img 
              className={styles.articleCardImage}
              src={getStrapiURL(article.image.formats.small.url)} 
              alt={article.image.alternativeText}
            />
          </div>
          <div className={styles.articleCardText}>
            <span>{article.category.name}</span>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <div className="uk-grid-small uk-flex-left"  style={{marginTop: '1.5rem'}} data-uk-grid="true">
              <div>
                {article.author.picture && (
                  <Image
                    image={article.author.picture}
                    style={{
                      objectFit: 'cover',
                      borderRadius: 9999,
                      height: "2.5rem",
                      width: "2.5rem"
                    }}
                  />
                )}
              </div>
              <div className="uk-width-expand">
                <p className="uk-margin-remove-bottom" style={{margin: 0, color:'black'}}>
                  {article.author.name}
                </p>
                <p className="uk-text-meta uk-margin-remove-top">
                  <Moment format="MMM Do YYYY">{article.published_at}</Moment>
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ArticleCard;