import React, {useContext} from 'react'
import RecipeIngredientsEdit from './RecipeIngredientsEdit'
import { RecipeContext } from './App'
import { v4 as uuidv4 } from 'uuid';

export default function RecipeEdit({recipe}) {
    const {handleRecipeChange, handleRecipeEditRemove} = useContext(RecipeContext)

    function helpRecipeChange(changes) {
       handleRecipeChange(recipe.id, {...recipe, ...changes})
    }

    function handleIngredientChange(id, ingredient) {
        const newIngredients = [...recipe.ingredients]
        const index = newIngredients.findIndex(i => i.id === id)
        newIngredients[index] = ingredient
        helpRecipeChange({ingredients: newIngredients})
    }

    function handleRecipeEditAddIngredient() {
        const newIngredient = {
            id: uuidv4(),
            name: '',
            amount: ''
        }
        helpRecipeChange({ingredients: [...recipe.ingredients, newIngredient]})
    }

    function handleRecipeEditIngredientDelete(id) {
        const newIngredients = recipe.ingredients.filter(i => i.id !== id)
        helpRecipeChange({ingredients: newIngredients})
    }

  return (
    <div className='recipe-edit'>
        <div className='recipe-edit__remove-btn-container'>
            <button onClick={handleRecipeEditRemove} className='btn recipe-edit__remove-btn'>&times;</button>
        </div>
        <div className='recipe-edit__form-grid'>
            <label className='recipe-edit__label' htmlFor="name">Name</label>
            <input 
            className='recipe-edit__input' 
            type="text" name='name' id='name' 
            value={recipe.recipeName} 
            onChange={e => helpRecipeChange(recipe.recipeName = e.target.value)}
            />
            <label className='recipe-edit__label' htmlFor="cookTime">Cooktime</label>
            <input 
            className='recipe-edit__input' 
            type="text" 
            name='cookTime' 
            id='cookTime' 
            value={recipe.cookTime}
            onChange={e => helpRecipeChange(recipe.cookTime = e.target.value)}
            />
            <label className='recipe-edit__label' htmlFor="servings">Servings</label>
            <input 
            className='recipe-edit__input' 
            type="number" 
            min='1' 
            name='servings' 
            id='servings' 
            value={recipe.servings}
            onChange={e => helpRecipeChange(recipe.servings = parseInt(e.target.value) || 'Info not available')}
            />
            <label className='recipe-edit__label' htmlFor="instruction">Instruction</label>
            <textarea 
            className='recipe-edit__input' 
            name="instruction" 
            id="instruction" 
            value={recipe.instruction}
            onChange={e => helpRecipeChange(recipe.instruction = e.target.value)}
            ></textarea>
        </div>
        <br />
        <label className='recipe-edit__label'>Ingredients</label>
        <div className='recipe-edit__ingredient-grid'>
            <div>Name</div>
            <div>Amount</div>
            <div></div>
            {recipe.ingredients.map(ingredient => 
                <RecipeIngredientsEdit 
                key={ingredient.id} 
                ingredient={ingredient} 
                handleIngredientChange={handleIngredientChange}
                handleRecipeEditIngredientDelete={handleRecipeEditIngredientDelete}
                />)
            }
        </div>
        <div className='recipe-edit__add-ingredient-btn-container'>
            <button onClick={handleRecipeEditAddIngredient} className='btn btn--primary'>Add Ingredient</button>
        </div>
    </div>
  )
}
