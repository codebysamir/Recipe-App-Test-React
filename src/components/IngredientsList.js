import React from 'react'
import Ingredient from './Ingredient'

export default function IngredientsList({ingredients}) {
    const ingredientsElm = ingredients.map(ingredient => {
        return (<Ingredient key={ingredient.id} {...ingredient}/>)
    })
  return (
    <div className='ingredients-list'>
        {ingredientsElm}
    </div>
  )
}
