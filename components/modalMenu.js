import React from 'react';
import Link from 'next/link';

function ModalMenu() {
  return(
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
          onClick={() => {document.querySelector('.modal-container').style.display = 'none'}}
        >
          <Link href="/answers">
            <a>Chhanna</a>
          </Link>
        </div>
        <div 
          className="wrapper-nav nav-link"
          onClick={() => {document.querySelector('.modal-container').style.display = 'none'}}
        >
          <Link href="/articles">
            <a>Thuziak</a>
          </Link>  
        </div>
        <div 
          className="wrapper-nav nav-link"
          onClick={() => {document.querySelector('.modal-container').style.display = 'none'}}
        >
          <Link href="/aboutus">
            <a>About Us</a>
          </Link>
        </div>
        <div 
          className="wrapper-nav nav-link navAskButton"
          onClick={() => {document.querySelector('.modal-container').style.display = 'none'}}
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
  )
}

export default ModalMenu;