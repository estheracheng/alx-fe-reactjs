import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
  const favorites = useRecipeStore((state) =>
    state.favorites.map((id) => state.recipes.find((r) => r.id === id))
  );

  if (favorites.length === 0) {
    return <p>No favorites yet. Add some recipes!</p>;
  }

  return (
    <div>
      <h2>⭐ My Favorites</h2>
      {favorites.map(
        (recipe) =>
          recipe && (
            <div key={recipe.id} style={{ margin: "10px 0" }}>
              <Link to={`/recipes/${recipe.id}`}>
                <strong>{recipe.title}</strong>
              </Link>
            </div>
          )
      )}
    </div>
  );
};

export default FavoritesList;
