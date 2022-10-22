import React, {useState, useEffect} from "react";
import RecipeList from "./RecipeList";
import "../css/app.css";
import { v4 as uuidv4 } from 'uuid';
import RecipeEdit from "./RecipeEdit";
import SearchBar from "./SearchBar";

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipe'

function App() {
  const handleRecipeContext = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
    handleRecipeEditRemove
  }

  const [recipes, setRecipe] = useState(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON !== null) {
      return JSON.parse(recipeJSON)
    } else {
      return recipeSample
    }
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const [selectRecipeID, setSelectRecipeID] = useState()
  const selectedRecipe = recipes.find(recipe => recipe.id === selectRecipeID)
  
  const [searchedRecipes, setSearchedRecipes] = useState()

  function handleRecipeSelect(id){
    setSelectRecipeID(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      recipeName: '',
      cookTime: '',
      servings: 1,
      instruction: '',
      ingredients: [
        {
          id: uuidv4(),
          name: '',
          amount: ''
        }
      ]
    }

    setSelectRecipeID(newRecipe.id)
    setRecipe([...recipes, newRecipe])
  }

  function handleRecipeDelete(id) {
    if (selectRecipeID !== null && selectRecipeID === id) {
      setSelectRecipeID(undefined)
    }
    setRecipe(recipes.filter(recipe => recipe.id !== id))
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipe(newRecipes)
  }
  
  function handleRecipeEditRemove() {
    setSelectRecipeID(undefined)
  }

  function handleRecipeSearch(name) {
    if (name !== '') {
      const filteredRecipes = recipes.filter(recipe => recipe.recipeName.includes(name))
      setSearchedRecipes(filteredRecipes)
    } else {
      setSearchedRecipes(undefined)
    }
  }

  return (
    <RecipeContext.Provider value={handleRecipeContext}>
      {!selectedRecipe && <SearchBar handleRecipeSearch={handleRecipeSearch} />}
      {searchedRecipes !== undefined ? <RecipeList recipeSample={searchedRecipes}/> : <RecipeList recipeSample={recipes}/>}
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
    </RecipeContext.Provider>
  )
}

export const recipeSample = [
  {
    id: 1,
    recipeName: 'Plain Chicken',
    cookTime: '1:45',
    servings: 3,
    instruction: "1. Put Salt on the Chicken\n2. Put Chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Punds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbs'
      }
    ]
  },
  {
    id: 2,
    recipeName: 'Plain Pork',
    cookTime: '0:45',
    servings: 5,
    instruction: "1. Put Paprika on the Pork\n2. Put Pork in oven\n3. Eat Pork",
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '3 Punds'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 Tbs'
      }
    ]
  }
]

export default App;
