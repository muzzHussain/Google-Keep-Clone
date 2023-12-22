import React from 'react';

const SearchBar = ({setSearchQuery}) => {
    const handleSearchQuery=(e)=>{
        console.log('e', e);
        setSearchQuery(e.target.value)
    }   
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." onChange={handleSearchQuery} />
    </div>
  );
}

export default SearchBar;
