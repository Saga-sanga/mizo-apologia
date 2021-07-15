import React from 'react';
import styles from '../styles/Home.module.css'

const CustomButton = ({children}) => {
  return (
    <a className={styles.buttonStyle}>
      {children}
    </a>
  );
}

export default CustomButton;