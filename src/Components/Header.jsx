import React from 'react'
import logo from '../Images/keep.png'
import SearchBar from './SearchBar';

const Header = ({setSearchQuery}) => {
  return (
    <div className='header'>
        <img src={logo} alt="logo" />
        <h1>Keep</h1>
        <SearchBar setSearchQuery={setSearchQuery}/>
    </div>
  )
}

export default Header;
