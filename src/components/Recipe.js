import React, {useContext} from 'react'
import IngredientsList from './IngredientsList';
import { RecipeContext } from './App';

export default function Recipe(props) {
    const {handleRecipeDelete} = useContext(RecipeContext)
    const {handleRecipeSelect} = useContext(RecipeContext)

    const {
        id,
        recipeName,
        cookTime, 
        servings, 
        instruction,
        ingredients
    } = props

    return (
        <div className='recipe'>
            <div className='recipe__header'>
                <h3 className='recipe__title'>{recipeName}</h3>
                <div>
                    <button onClick={() => handleRecipeSelect(id)} className='btn btn--primary mr-1'>Edit</button>
                    <button onClick={() => handleRecipeDelete(id)} className='btn btn--secondary'>Delete</button>
                </div>
            </div>
            <div>
                <div className='recipe__row'>
                    <span className='recipe__label'>Cooktime:</span>
                    <span className='recipe__value'>{cookTime}</span>
                </div>
                <div className='recipe__row'>
                    <span className='recipe__label'>Servings:</span>
                    <span className='recipe__value'>{servings}</span>
                </div>
                <div className='recipe__row'>
                    <span className='recipe__label'>Instruction:</span>
                    <div className='recipe__value recipe__instruction recipe__value--indented'>
                        {instruction}
                    </div>
                </div>
                <div className='recipe__row'>
                    <span className='recipe__label'>Ingredients:</span>
                    <div className='recipe__value recipe__value--indented'>
                        <IngredientsList ingredients={ingredients}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
