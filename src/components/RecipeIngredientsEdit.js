import React from 'react'

export default function RecipeIngredientsEdit({ingredient, handleIngredientChange, handleRecipeEditIngredientDelete}) {
    function helpIngredientChange(changes) {
        handleIngredientChange(ingredient.id, {...ingredient, ...changes})
    }

  return (
    <>
        <input 
        className='recipe-edit__input' 
        type="text" 
        value={ingredient.name} 
        onChange={e => helpIngredientChange(ingredient.name = e.target.value)}
        />
        <input 
        className='recipe-edit__input' 
        type="text" 
        value={ingredient.amount}
        onChange={e => helpIngredientChange(ingredient.amount = e.target.value)}
        />
        <button 
        onClick={() => handleRecipeEditIngredientDelete(ingredient.id)} 
        className='btn btn--secondary'>&times;
        </button>
    </>
  )
}
