import React, {useContext} from 'react'
import RecipeIngredientsEdit from './RecipeIngredientsEdit'
import RecipeCreaterEdit from './RecipeCreaterEdit';
import { RecipeContext } from './App'
import { v4 as uuidv4 } from 'uuid';

export default function RecipeEdit({recipe}) {
    const {handleRecipeChange, handleRecipeEditRemove} = useContext(RecipeContext)

    function handleChange(changes) {
       handleRecipeChange(recipe.id, {...recipe, ...changes})
    }

    function handleIngredientChange(id, ingredient) {
        const newIngredients = [...recipe.ingredients]
        const index = newIngredients.findIndex(i => i.id === id)
        newIngredients[index] = ingredient
        handleChange({ingredients: newIngredients})
    }

    function handleRecipeEditAddIngredient() {
        const newIngredient = {
            id: uuidv4(),
            name: '',
            amount: ''
        }
        handleChange({ingredients: [...recipe.ingredients, newIngredient]})
    }

    function handleRecipeEditIngredientDelete(id) {
        const newIngredients = recipe.ingredients.filter(i => i.id !== id)
        handleChange({ingredients: newIngredients})
    }

    function handleCreaterChange(id, creater) {
        const newCreaters = [...recipe.creaters]
        const index = newCreaters.findIndex(c => c.id === id)
        newCreaters[index] = creater
        handleChange({creaters: newCreaters})
    }

    function handleRecipeEditCreaterAdd() {
        const newCreater = {
            id: uuidv4(),
            name: ''
        }
        handleChange({creaters: [...recipe.creaters, newCreater]})
    }

    function handleRecipeEditCreaterDelete(id) {
        const newCreater = recipe.creaters.filter(c => c.id !== id)
        handleChange({creaters: newCreater})
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
            onChange={e => handleChange(recipe.recipeName = e.target.value)}
            />
            <label className='recipe-edit__label' htmlFor="cookTime">Cooktime</label>
            <input 
            className='recipe-edit__input' 
            type="text" 
            name='cookTime' 
            id='cookTime' 
            value={recipe.cookTime}
            onChange={e => handleChange(recipe.cookTime = e.target.value)}
            />
            <label className='recipe-edit__label' htmlFor="servings">Servings</label>
            <input 
            className='recipe-edit__input' 
            type="number" 
            min='1' 
            name='servings' 
            id='servings' 
            value={recipe.servings}
            onChange={e => handleChange(recipe.servings = parseInt(e.target.value) || 'Info not available')}
            />
            <label className='recipe-edit__label' htmlFor="instruction">Instruction</label>
            <textarea 
            className='recipe-edit__input' 
            name="instruction" 
            id="instruction" 
            value={recipe.instruction}
            onChange={e => handleChange(recipe.instruction = e.target.value)}
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
        <div className='recipe-edit__add-btn-container'>
            <button onClick={handleRecipeEditAddIngredient} className='btn btn--primary'>Add Ingredient</button>
        </div>
        <br />
        <label className='recipe-edit__label'>Recipe made by:</label>
        <div className='recipe-edit__recipe-creater-grid'>
            <div>Name</div>
            <div></div>
            {recipe.creaters.map(creater => 
                <RecipeCreaterEdit 
                key={creater.id} 
                creater={creater} 
                handleCreaterChange={handleCreaterChange}
                handleRecipeEditCreaterDelete={handleRecipeEditCreaterDelete}
                />)
            }
        </div>
        <div className='recipe-edit__add-btn-container'>
            <button onClick={handleRecipeEditCreaterAdd} className='btn btn--primary'>Add Recipe Creater</button>
        </div>
    </div>
  )
}
