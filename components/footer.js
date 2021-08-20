import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css'
// import Moment from 'react-moment';

function Footer() {
  const date = new Date().getFullYear();
  return (
    <div 
      className={styles.footerContainer}
    >
      <div 
        className={styles.footerBody}
      >
        <div>
          <h4 className={styles.footerh4}>Kan Mission</h4>
          <p className={styles.missionText}>
            Mizo Apologia rawngbawlna hian internet kaltlangin thlarau lam thila zawhna 
            hrang hrangte Bible atanga chhanna hmangin Lalpa Isua Krista ram tihzauh a tum a ni. 
          </p>
        </div>

        <div
          className={styles.footerContent}
        >
          <h4 className={styles.footerh4}>Quick Links</h4>
          <Link href="/topic">
            <a className={styles.footerText}>Chhanna</a>
          </Link>
          <Link href="/category">
            <a className={styles.footerText}>Thuziak</a>
          </Link> 
          <Link href="/aboutus">
            <a className={styles.footerText}>About Us</a>
          </Link>
          <Link href="/ask">
            <a className={styles.footerText}>
              Zawt Rawh
            </a>
          </Link>
        </div>

        <div 
          className={styles.footerContent}
        >
          <h4 className={styles.footerh4}>Contact Us</h4>
          <span className={styles.footerText}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
              </path>
            </svg> number
          </span>
          <span className={styles.footerText}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
              </path><polyline points="22,6 12,13 2,6"></polyline>
            </svg> email@email.com
          </span>
          <span className={styles.footerText}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z">
              </path><circle cx="12" cy="10" r="3"></circle>
            </svg> VB-97, Vaivakawn, Aizawl, Mizoram, P.O. 796009 
          </span>
        </div>
      </div>

      <span 
        className={styles.copyRightText}
      >
        Copyright © {date} MizoApologia.org. All Rights Reserved.
      </span>
    </div>
  );
}

export default Footer;