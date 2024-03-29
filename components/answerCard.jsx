import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Moment from 'react-moment';
import { getStrapiURL } from '../lib/api';
import placeholder from '../public/placeholder.png';
import Image from 'next/image';

const AnswerCard = ({ answer }) => {
  let displayImage;
  const answerImage = answer.image.data.attributes;
  
  if (answerImage.formats.hasOwnProperty("small")) {
    displayImage = getStrapiURL(answerImage.formats.small.url);
  } else {
    displayImage = placeholder.src;
  }

  return (
    (<Link as={`/answer/${answer.slug}`} href="/answer/[id]" legacyBehavior>
      <a>
        <div className={`${styles.articleCard} nav-shadow`}>
          <div className='relative'>
            <Image 
              className={styles.answerCardImage}
              src={displayImage} 
              alt={answerImage.alternativeText}
              fill
            />
          </div>
          <div className={styles.answerCardText}>
            {(answer.topic.data === null) ? '' : <span className='text-sm'>{answer.topic.data.attributes.name}</span>}            
            <p style={{color: 'black', marginBottom: 0}} className='line-clamp-5 text-lg font-serif'>{answer.title}</p>
            <div 
              className="uk-flex-left"  
              style={{marginTop: '0.8rem'}}
              data-uk-grid="true"
            >
              <div className="uk-width-expand pl-zero">
                <p className="uk-text-meta uk-margin-remove-top">
                  <Moment format="MMM Do YYYY">{answer.publishedAt}</Moment>
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>)
  );
}

export default AnswerCard;