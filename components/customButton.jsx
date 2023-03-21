import React from 'react';
import styles from '../styles/Home.module.css'
import Link from 'next/link';

const CustomButton = ({linkPath, children}) => {
  return (
    (<Link href={linkPath} passHref className={styles.buttonStyle}>

      {children}

    </Link>)
  );
}

export default CustomButton;