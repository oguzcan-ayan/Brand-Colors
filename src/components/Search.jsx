import React, { useContext } from 'react';
import { GrSearch } from 'react-icons/gr';
import MainContext from '../contexts/MainContext';

function Search() {

  const {search, setSearch} = useContext(MainContext);

  return (
    <>
        <div className='search'>
            <div className='search-icon'><GrSearch /></div>
            <input type='text' onChange={(e) => setSearch(e.target.value)} placeholder='Search Brands'></input>
        </div>
    </>
  )
}

export default Search;