import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes)
  const searchTerm = useRecipeStore((state) => state.searchTerm)
  const addFavorite = useRecipeStore((state) => state.addFavorite)
  const removeFavorite = useRecipeStore((state) => state.removeFavorite)
  const isFavorite = useRecipeStore((state) => state.isFavorite)

  const handleFavoriteToggle = (recipeId, e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isFavorite(recipeId)) {
      removeFavorite(recipeId)
    } else {
      addFavorite(recipeId)
    }
  }

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
          <div key={recipe.id} style={{ 
            marginBottom: '20px', 
            padding: '15px', 
            border: '1px solid #ddd', 
            borderRadius: '5px',
            position: 'relative'
          }}>
            <button
              onClick={(e) => handleFavoriteToggle(recipe.id, e)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: isFavorite(recipe.id) ? '#ff4757' : '#ccc'
              }}
              title={isFavorite(recipe.id) ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite(recipe.id) ? '❤️' : '🤍'}
            </button>
            
            <Link to={`/recipe/${recipe.id}`}>
              <h3>{recipe.title}</h3>
            </Link>
            <p>{recipe.description}</p>
            
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div>
                <strong>Ingredients:</strong>
                <ul>
                  {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                  {recipe.ingredients.length > 3 && <li>...and {recipe.ingredients.length - 3} more</li>}
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