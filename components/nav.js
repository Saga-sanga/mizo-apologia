import React from 'react';
import Link from 'next/link';

const Nav = () => {
  return (
    <div>
      <nav className="nav-style _1200px-nav-container">
        <div>
          <Link href="/">
            <a><h1>Mizo Apologia</h1></a>
          </Link>
        </div>
        <div className="nav-style">
          <div className="wrapper-nav nav-link">
            Blog
          </div>
          <div className="wrapper-nav nav-link">
            Answers
          </div>
          <div className="wrapper-nav nav-link">
            About Us
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