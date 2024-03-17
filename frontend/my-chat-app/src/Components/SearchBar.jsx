import React from 'react'
import scan from "../assets/scan.png";
function SearchBar() {
  return (
    <form className='SearchBar-container'>
        <input className='search-field' type="text" placeholder='Search for users'/>
        <img src={scan} alt="ScanImage"/>
        
    </form>
  )
}

export default SearchBar