import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Moment from 'react-moment';
import { getStrapiURL } from '../lib/api';

const AnswerCard = ({ answer }) => {
  return (
    <Link as={`/answer/${answer.slug}`} href="/answer/[id]">
      <a className={`${styles.articleCard} nav-shadow`}>
        <div>
          <div>
            <img 
              className={styles.answerCardImage}
              src={getStrapiURL(answer.image.formats.thumbnail.url)} 
              alt={answer.image.alternativeText}
            />
          </div>
          <div className={styles.answerCardText}>
            {/* <span>{answer.topic.name}</span> */}
            <h4 style={{color: 'black'}}>{answer.title}</h4>
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
    </Link>
  )
}

export default AnswerCard;