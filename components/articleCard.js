import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
// import Image from '../components/image';
import Moment from 'react-moment';
import Image from 'next/image';
import { getStrapiURL } from '../lib/api';
import { getStrapiMedia } from "../lib/media";
import placeholder from "../public/placeholder.png";

const ArticleCard = ({ article }) => {
  const authorImage = article.author.data.attributes.picture;
  const articleImage = article.image.data.attributes;
  const imageUrl = getStrapiMedia(authorImage);
  let displayImage;
  
  if (articleImage.formats.hasOwnProperty("medium")) {
    displayImage = getStrapiURL(articleImage.formats.medium.url);
  } else {
    displayImage = placeholder.src;
  }

  return (
    (<Link as={`/article/${article.slug}`} href="/article/[id]">

      <div className={`${styles.articleCard} nav-shadow`}>
        <div>
          <img 
            className={styles.articleCardImage}
            src={displayImage} 
            alt={article.image.alternativeText}
          />
        </div>
        <div className={styles.articleCardText}>
          <span>{article.category.data.attributes.name}</span>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <div className="uk-grid-small uk-flex-left"  style={{marginTop: '1.5rem'}} data-uk-grid="true">
            <div style={{alignSelf: 'center'}}>
              {authorImage && (
                <Image
                  className={styles.authorImage}
                  src={imageUrl}
                  objectFit="cover"
                  style={{objectFit: "cover"}}
                  height="45"
                  width="45"
                />
              )}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom" style={{margin: 0, color:'black'}}>
                {article.author.data.attributes.name},
              </p>
              <p className="uk-margin-remove-bottom" style={{margin: 0, color:'black', fontSize: '14px'}}>
                {article.author.data.attributes.Title}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">{article.published_at}</Moment>
              </p>
            </div>
          </div>
        </div>
      </div>

    </Link>)
  );
}

export default ArticleCard;