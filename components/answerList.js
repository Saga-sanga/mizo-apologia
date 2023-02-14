import React from 'react';
import AnswerCard from './answerCard.js'
import styles from '../styles/Home.module.css'

const AnswerList = ({ answers }) => {
  console.log("AnswerList: ", answers)
  return (
    <div className={styles.answerGrid}>
      {answers.map(answer => {
        return (
          <AnswerCard answer={answer.attributes} key={answer.attributes.slug}/>
        );
      })}
    </div>
  )
}

export default AnswerList;