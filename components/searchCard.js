import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Moment from 'react-moment';
import { getStrapiURL } from '../lib/api';

const SearchCard = ({ result }) => {
  return (
    (<Link as={`/answer/${result.attributes.slug}`} href="/answer/[id]" legacyBehavior>
      <a href="">
        <div className={`${styles.articleCard} nav-shadow`}>
          <div>
            <img
              className={styles.answerCardImage}
              src={getStrapiURL(result.attributes.image.data.attributes.formats.thumbnail.url)}
              alt={result.attributes.image.data.attributes.alternativeText}
            />
          </div>
          <div className={styles.answerCardText}>
            {/* <span>{answer.topic.name}</span> */}
            <p style={{color: 'black', marginBottom: 0}}>{result.attributes.title}</p>
            <div
              className="uk-grid-small uk-flex-left"
              style={{marginTop: '0.8rem'}}
              data-uk-grid="true"
            >
              <div className="uk-width-expand pl-zero">
                <p className="uk-text-meta uk-margin-remove-top">
                  <Moment format="MMM Do YYYY">{result.attributes.publishedAt}</Moment>
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>)
  );
}

export default SearchCard;