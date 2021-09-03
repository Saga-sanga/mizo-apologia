import Layout from '../../components/layout';
import React, { useState } from 'react';
import { fetchAPI } from '../../lib/api';
import SearchList from '../../components/searchList';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('Zawng Rawh le');
  
  const handleChange = (event) => {
    const query = event.target.value;
    setQuery(query);
  }

  const submitSearch = async () => {
    const contentType = 'answers';
    let results = [];
    if (query.length) {
      results = await fetchAPI(`/${contentType}?title_contains=${query}`);
      setResults(results);
      if (results.length === 0) {
        setMessage('I thil zawn kan hmu lo!');
      }
    }
    console.log(results);
  }

  return (
    <Layout>
      <div className="uk-container uk-container-large search-body">

        <div className='search-content'>
          <div className='search-bar'>
            
            <input 
              className="search-text-input" 
              type="text" placeholder="Search" 
              onChange={handleChange}
              onKeyPress={(e) => {
                if(e.key === "Enter") {
                  submitSearch();
                }
              }}
            />
            <button 
              className='search-button' 
              onClick={submitSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>

        {results.length === 0 ? <h3>{message}</h3> : <SearchList results={results}/>}
        
      </div>
    </Layout>
  );
}

export default Search;