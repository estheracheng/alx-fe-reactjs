import { Link } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';
import FavoriteButton from './FavoriteButton';

const RecipeList = () => {
  const recipes = useRecipeStore((state) =>
    state.searchTerm ? state.filteredRecipes : state.recipes
  );

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              <FavoriteButton recipeId={recipe.id} />
            </h3>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
