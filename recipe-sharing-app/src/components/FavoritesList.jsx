import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const FavoritesList = () => {
  const favorites = useRecipeStore(state => 
    state.favorites.map(id => state.recipes.find(recipe => recipe.id === id))
  )
  const removeFavorite = useRecipeStore(state => state.removeFavorite)

  if (favorites.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>My Favorites</h2>
        <p>You haven't added any recipes to your favorites yet.</p>
        <p>Click the heart icon on any recipe to add it to your favorites!</p>
      </div>
    )
  }

  return (
    <div>
      <h2>My Favorites ({favorites.length})</h2>
      {favorites.map(recipe => (
        recipe ? (
          <div key={recipe.id} style={{ 
            marginBottom: '20px', 
            padding: '15px', 
            border: '1px solid #ddd', 
            borderRadius: '5px',
            position: 'relative'
          }}>
            <button
              onClick={() => removeFavorite(recipe.id)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#ff4757'
              }}
              title="Remove from favorites"
            >
              ❤️
            </button>
            
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
        ) : null
      ))}
    </div>
  )
}

export default FavoritesList