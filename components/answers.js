import React from 'react';
import AnswerCard from './AnswerCard.js'
import styles from '../styles/Home.module.css'

const Answers = ({ answers }) => {
  return (
    <div className={styles.grid}>
      {answers.map(answer => {
        return (
          <AnswerCard answer={answer} key={answer.slug}/>
        );
      })}
    </div>
  )
}

export default Answers;