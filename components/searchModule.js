import React from 'react';
import { fetchAPI } from '../lib/api';

function SearchModule() {
  const queryAPI = (contentType, query) => {
    fetchAPI(`/${contentType}?slug_contains=${query}`);
  }

  return (
    <div className="search-container">
      <div className='search-menu modal-menu'>
        <span 
          className="close-icon"
          onClick={() => {document.querySelector('.search-container').style.visibility = 'hidden'}}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </span>
        <div className='search-content'>
          <div class='search-bar'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Search"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModule