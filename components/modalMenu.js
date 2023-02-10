import React from 'react';
import Link from 'next/link';

function ModalMenu() {
  const closeModal = () => {document.querySelector('.modal-container').style.display = 'none'};

  return (
    <div className="modal-container">
      <div className="modal-menu">
        <span 
          className="close-icon"
          onClick={closeModal}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </span>
        <div 
          className="wrapper-nav nav-link" 
          onClick={closeModal}
        >
          <Link href="/">
            Home
          </Link>
        </div>         
        <div 
          className="wrapper-nav nav-link"
          onClick={closeModal}
        >
          <Link href="/answers">
            Chhanna
          </Link>
        </div>
        <div 
          className="wrapper-nav nav-link"
          onClick={closeModal}
        >
          <Link href="/articles">
            Thuziak
          </Link>  
        </div>
        <div 
          className="wrapper-nav nav-link"
          onClick={closeModal}
        >
          <Link href="/aboutus">
            About Us
          </Link>
        </div>
        <div 
          className="wrapper-nav nav-link navAskButton"
          onClick={closeModal}
          style={{marginTop: '16px'}}
        >
          <Link href="/ask">
            
              Zawt Rawh
            
          </Link>
        </div>
        <div style={{padding: '14px'}}></div>
      </div>
    </div>
  );
}

export default ModalMenu;