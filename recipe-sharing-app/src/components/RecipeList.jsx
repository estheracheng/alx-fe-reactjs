import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes)
  const searchTerm = useRecipeStore((state) => state.searchTerm)

  return (
    <div>
      {searchTerm && (
        <p style={{ marginBottom: '20px' }}>
          Showing {filteredRecipes.length} result{filteredRecipes.length !== 1 ? 's' : ''} for "{searchTerm}"
        </p>
      )}
      
      {filteredRecipes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>No recipes found{searchTerm ? ` matching "${searchTerm}"` : ''}.</p>
          {searchTerm && <p>Try a different search term or clear your search.</p>}
        </div>
      ) : (
        filteredRecipes.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <Link to={`/recipe/${recipe.id}`}>
              <h3>{recipe.title}</h3>
            </Link>
            <p>{recipe.description}</p>
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div>
                <strong>Ingredients:</strong>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default RecipeList