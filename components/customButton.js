import React from 'react';
import styles from '../styles/Home.module.css'
import Link from 'next/link';

const CustomButton = ({linkPath, children}) => {
  console.log(linkPath);
  return (
    <Link href={linkPath} passHref>
      <a className={styles.buttonStyle}>
        {children}
      </a>
    </Link>
  );
}

export default CustomButton;