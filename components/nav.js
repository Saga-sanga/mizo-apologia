import React from 'react';
import Link from 'next/link';

const Nav = () => {
  return (
    <div className="nav-shadow">
      <nav className="nav-style _1200px-nav-container">
        <div>
          <Link href="/">
            <a className="logo-container">
              <h1 className="logo">
                Mizo Apologia
              </h1>
              <span className="logo-sub-text">I Zawhna te. Bible Atanga Chhanna.</span>
            </a>
          </Link>
        </div>
        <div className="nav-style">
          <div className="wrapper-nav nav-link">
            <Link href="/category">
              <a>Blog</a>
            </Link>  
          </div>
          <div className="wrapper-nav nav-link">
            <Link href="/topic">
              <a>Answers</a>
            </Link>
          </div>
          <div className="wrapper-nav nav-link">
            <Link href="/aboutus">
              <a>About Us</a>
            </Link>
          </div>
          <div className="wrapper-nav nav-link">
            Ask
          </div>
          <div className="wrapper-nav nav-link">
            Search
          </div>
        </div>
      </nav>
    </div>
  )
} 

export default Nav;