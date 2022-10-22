import React from 'react'

export default function SearchBar({handleRecipeSearch}) {
  return (
    <div className='search-bar'>
        <label className='search-bar__label' htmlFor="searchBar">Search for your Recipe</label>
        <div></div>
        <input className='search-bar__input' type="text" name='searchBar' id='searchBar'/>
        <div className='search-bar__search-btn-container'>
            <button onClick={() => {
                const input = document.querySelector('.search-bar__input')
                handleRecipeSearch(input.value)
            }} 
            className='btn btn--primary'>Search</button>
        </div>
    </div>
  )
}
