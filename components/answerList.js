import React from 'react';
import AnswerCard from './answerCard.js'
import styles from '../styles/Home.module.css'

const AnswerList = ({ answers }) => {
  return (
    <div className={styles.answerGrid}>
      {answers.length ? answers.map(answer => {
        return (
          <AnswerCard answer={answer.attributes} key={answer.attributes.slug}/>
        );
      }) : <h1 className='min-h-[23vh]'>He Topic ah hian Chhanna a om lo!</h1>}
    </div>
  )
}

export default AnswerList;