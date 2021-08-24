import React from 'react';
import Link from 'next/link';

const Nav = () => {
  return (
    <div className="nav-shadow nav-sticky">
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
          {/* <div className="wrapper-nav nav-link">
            Search
          </div> */}
        </div>

        <div 
          className="hamburger-menu" 
          onClick={() => {document.querySelector('.modal-container').style.display = 'block'}}
        >
          <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="34px" height="34px"><path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"/></svg>
        </div>

        {/* Modal Menu */}
        <div className="modal-container">
          <div className="modal-menu">
            <span 
              className="close-icon"
              onClick={() => {document.querySelector('.modal-container').style.display = 'none'}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </span>
            <div 
              className="wrapper-nav nav-link" 
              onClick={() => {document.querySelector('.modal-container').style.display = 'none'}}
            >
              <Link href="/">
                <a>Home</a>
              </Link>
            </div>         
            <div 
              className="wrapper-nav nav-link"
            >
              <Link href="/answers">
                <a>Chhanna</a>
              </Link>
            </div>
            <div 
              className="wrapper-nav nav-link"
            >
              <Link href="/articles">
                <a>Thuziak</a>
              </Link>  
            </div>
            <div 
              className="wrapper-nav nav-link"
            >
              <Link href="/aboutus">
                <a>About Us</a>
              </Link>
            </div>
            <div 
              className="wrapper-nav nav-link navAskButton" 
              style={{marginTop: '16px', marginLeft: 0}}
            >
              <Link href="/ask">
                <a>
                  Zawt Rawh
                </a>
              </Link>
            </div>
            <div style={{padding: '14px'}}></div>
          </div>
        </div>
      </nav>
    </div>
  )
} 

export default Nav;