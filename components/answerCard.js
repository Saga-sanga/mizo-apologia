import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Moment from 'react-moment';
import { getStrapiURL } from '../lib/api';
import placeholder from '../public/placeholder.png';

const AnswerCard = ({ answer }) => {
  let displayImage;
  
  if (answer.image.formats.hasOwnProperty("small")) {
    displayImage = getStrapiURL(answer.image.formats.small.url);
  } else {
    displayImage = placeholder.src;
  }

  return (
    (<Link as={`/answer/${answer.slug}`} href="/answer/[id]" legacyBehavior>
      <a>
        <div className={`${styles.articleCard} nav-shadow`}>
          <div>
            <img 
              className={styles.answerCardImage}
              src={displayImage} 
              alt={answer.image.alternativeText}
              // onError={this.src=placeholder}
            />
          </div>
          <div className={styles.answerCardText}>
            {(answer.topic === null) ? '' : <span>{answer.topic.name}</span>}            
            <p style={{color: 'black', marginBottom: 0}}>{answer.title}</p>
            <div 
              className="uk-grid-small uk-flex-left"  
              style={{marginTop: '0.8rem'}}
              data-uk-grid="true"
            >
              <div className="uk-width-expand">
                <p 
                  className="uk-text-meta uk-margin-remove-top"
                >
                  <Moment format="MMM Do YYYY">{answer.published_at}</Moment>
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