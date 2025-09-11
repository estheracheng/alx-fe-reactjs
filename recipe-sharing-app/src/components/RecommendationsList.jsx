import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations)
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations)
  const addFavorite = useRecipeStore(state => state.addFavorite)
  const isFavorite = useRecipeStore(state => state.isFavorite)

  // Generate recommendations when component mounts
  useEffect(() => {
    generateRecommendations()
  }, [generateRecommendations])

  if (recommendations.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Personalized Recommendations</h2>
        <p>Add some recipes to your favorites to get personalized recommendations!</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Recommended For You</h2>
      <p>Based on your favorite recipes</p>
      
      {recommendations.map(recipe => (
        <div key={recipe.id} style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          border: '1px solid #ddd', 
          borderRadius: '5px',
          position: 'relative'
        }}>
          <button
            onClick={() => addFavorite(recipe.id)}
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
      ))}
    </div>
  )
}

export default RecommendationsList