import { useRecipeStore } from '../recipeStore';

const FavoriteButton = ({ recipeId }) => {
  const { favorites, addFavorite, removeFavorite } = useRecipeStore();

  const isFavorite = favorites.includes(recipeId);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <button onClick={toggleFavorite} style={{ marginLeft: "10px" }}>
      {isFavorite ? "★ Remove Favorite" : "☆ Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
