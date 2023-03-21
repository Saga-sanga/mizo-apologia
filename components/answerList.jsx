import React from 'react';
import AnswerCard from './answerCard.jsx'
import styles from '../styles/Home.module.css'

const AnswerList = ({ answers }) => {
  return (
    <div className={styles.answerGrid}>
      {answers.length ? answers.map(answer => {
        return (
          <AnswerCard answer={answer.attributes} key={answer.attributes.slug}/>
        );
      }) : <p className='min-h-[23vh]'>He Topic ah hian Chhanna a om lo!</p>}
    </div>
  )
}

export default AnswerList;