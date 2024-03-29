import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
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
  
  if (articleImage.formats.hasOwnProperty("small")) {
    displayImage = getStrapiURL(articleImage.formats.small.url);
  } else {
    displayImage = placeholder.src;
  }

  return (
    <Link as={`/article/${article.slug}`} href="/article/[id]">

      <div className={`${styles.articleCard} nav-shadow`}>
        <div className='relative'>
          <Image
            className={styles.articleCardImage}
            src={displayImage} 
            alt={article.image.alternativeText}
            fill
          />
        </div>
        <div className={styles.articleCardText}>
          <span className='text-sm'>{article.category.data.attributes.name}</span>
          <h3 className='text-xl font-serif'>{article.title}</h3>
          <p className='line-clamp-6'>{article.description}</p>
          <div className="flex gap-4"  style={{marginTop: '1.5rem'}} data-uk-grid="true">
            <div style={{alignSelf: 'center'}} className='pl-zero'>
              {authorImage && (
                <Image
                  alt="Author's headshot"
                  className={styles.authorImage}
                  src={imageUrl}
                  style={{objectFit: "cover", height: '45px', width: '45px'}}
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
                <Moment format="MMM Do YYYY">{article.publishedAt}</Moment>
              </p>
            </div>
          </div>
        </div>
      </div>

    </Link>
  );
}

export default ArticleCard;