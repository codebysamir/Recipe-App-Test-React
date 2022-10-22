import React from 'react'

export default function RecipeCreaterEdit({creater, handleCreaterChange, handleRecipeEditCreaterDelete}) {
    function handleChange(changes) {
        handleCreaterChange(creater.id, {...creater, ...changes})
    }
  return (
    <>
        <input 
        className='recipe-edit__input' 
        type="text" 
        value={creater.name} 
        onChange={e => handleChange(creater.name = e.target.value)}
        />
        <button 
        onClick={() => handleRecipeEditCreaterDelete(creater.id)} 
        className='btn btn--secondary'
        >&times;
        </button>        
    </>
  )
}
