import React from 'react';
import AnswerCard from './answerCard.js'
import styles from '../styles/Home.module.css'

const AnswerList = ({ answers }) => {
  return (
    <div className={styles.answerGrid}>
      {answers.map(answer => {
        return (
          <AnswerCard answer={answer} key={answer.slug}/>
        );
      })}
    </div>
  )
}

export default AnswerList;