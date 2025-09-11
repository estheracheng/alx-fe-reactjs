import { useParams, Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'
import EditRecipeForm from './EditRecipeForm'
import DeleteRecipeButton from './DeleteRecipeButton'

const RecipeDetails = () => {
  const { id } = useParams()
  const recipeId = parseInt(id)
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === recipeId)
  )

  if (!recipe) {
    return (
      <div>
        <h2>Recipe not found</h2>
        <Link to="/">Back to Recipes</Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/">← Back to Recipes</Link>
      
      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
        
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        )}
        
        {recipe.prepTime && (
          <div style={{ marginTop: '15px' }}>
            <strong>Preparation Time:</strong> {recipe.prepTime} minutes
          </div>
        )}
        
        <div style={{ marginTop: '30px' }}>
          <EditRecipeForm recipe={recipe} />
          <DeleteRecipeButton recipeId={recipe.id} />
        </div>
      </div>
    </div>
  )
}

export default RecipeDetails