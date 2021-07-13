import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const AnswerCard = ({ answer }) => {
  return (
    <div className={styles.card}>
      <Link as={`/answer/${answer.slug}`} href="/answer/[id]">
        <a>
          <p>{answer.title}</p>
        </a>
      </Link>
    </div>
  )
}

export default AnswerCard;