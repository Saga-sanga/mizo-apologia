import React from 'react';
import Link from 'next/link';
import ModalMenu from './modalMenu';

const Nav = () => {
  return (
    <div className="nav-shadow nav-sticky">
      <nav className="nav-style _1440px-nav-container">
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

        {/* Hamburger and search icon */}
        <div className="mobile-menu-section hamburger-menu">
          <Link href="/search">
            <a className='mobile-search-icon'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </a>
          </Link>
          <div 
            onClick={() => {document.querySelector('.modal-container').style.display = 'block'}}
          >
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="34px" height="34px"><path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"/></svg>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="nav-style nav-links">
         <div className="wrapper-nav nav-link">
            <Link href="/">
              <a>Home</a>
            </Link>
          </div>         
          <div className="wrapper-nav nav-link">
            <Link href="/answers">
              <a>Chhanna</a>
            </Link>
          </div>
          <div className="wrapper-nav nav-link">
            <Link href="/articles">
              <a>Thuziak</a>
            </Link>  
          </div>
          <div className="wrapper-nav nav-link">
            <Link href="/aboutus">
              <a>About Us</a>
            </Link>
          </div>
          <div className="wrapper-nav nav-link navAskButton">
            <Link href="/ask">
              <a>
                Zawt Rawh
              </a>
            </Link>
          </div>        
          <div 
            className="wrapper-nav nav-link"
          >
            <Link href="/search">
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </a>
            </Link>
          </div>
        </div>

        <ModalMenu/>
      </nav>
    </div>
  )
} 

export default Nav;