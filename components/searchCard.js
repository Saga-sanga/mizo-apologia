import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Moment from 'react-moment';
import { getStrapiURL } from '../lib/api';

const SearchCard = ({ result }) => {
  return (
    <Link as={`/answer/${result.slug}`} href="/answer/[id]">
      <a >
        <div className={`${styles.articleCard} nav-shadow`}>
          <div>
            <img 
              className={styles.answerCardImage}
              src={getStrapiURL(result.image.formats.thumbnail.url)} 
              alt={result.image.alternativeText}
            />
          </div>
          <div className={styles.answerCardText}>
            {/* <span>{answer.topic.name}</span> */}
            <p style={{color: 'black', marginBottom: 0}}>{result.title}</p>
            <div 
              className="uk-grid-small uk-flex-left"  
              style={{marginTop: '0.8rem'}}
              data-uk-grid="true"
            >
              <div className="uk-width-expand">
                <p 
                  className="uk-text-meta uk-margin-remove-top"
                >
                  <Moment format="MMM Do YYYY">{result.published_at}</Moment>
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default SearchCard;