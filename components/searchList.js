import React from 'react';
import SearchCard from './searchCard.js'
import styles from '../styles/Home.module.css'

const SearchList = ({ results }) => {
  return (
    <div className={styles.answerGrid}>
      {results.map(result => {
        return (
          <SearchCard result={result} key={result.attributes.slug}/>
        );
      })}
    </div>
  )
}

export default SearchList;