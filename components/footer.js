import React from 'react';
import Link from 'next/link';
// import Moment from 'react-moment';

function Footer() {
  const date = new Date().getFullYear();
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: '0.8rem',
        borderTop: '1px solid #e1e0e3'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        marginTop: '2rem'
      }}>
        <div
          style={{maxWidth: '25%'}}
        >
          <h4>Our Mission</h4>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis eaque odit eius accusamus quis temporibus aliquid eligendi vel laudantium quos molestiae a, nam obcaecati culpa voluptate natus quae veritatis asperiores.</p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <h4>Quick Links</h4>
          <Link href="/topic">
            <a>Chhanna</a>
          </Link>
          <Link href="/category">
            <a>Blog</a>
          </Link> 
          <Link href="/aboutus">
            <a>About Us</a>
          </Link>
          <Link href="/ask">
            <a>
              Zawt Rawh
            </a>
          </Link>
        </div>

        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <h4>Contact Us</h4>
          <span>Phn: number</span>
          <span>Email: email@email.com</span>
          <span>Add: VB-97, Vaivakawn, Aizawl, Mizoram, P.O. 796009.</span>
        </div>
      </div>

      <span 
        style={{
          textAlign: 'center',
          margin: '1rem'
        }}
      >
        Copyright © {date} MizoApologia.org. All Rights Reserved.
      </span>
    </div>
  );
}

export default Footer;