import { useEffect } from 'react';
import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';

const RecommendationsList = () => {
  const { recommendations, generateRecommendations } = useRecipeStore();

  // Generate recommendations whenever this component loads
  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  if (recommendations.length === 0) {
    return <p>No recommendations yet. Add some favorites!</p>;
  }

  return (
    <div>
      <h2>🍴 Recommended for You</h2>
      {recommendations.map((recipe) => (
        <div key={recipe.id} style={{ margin: "10px 0" }}>
          <Link to={`/recipes/${recipe.id}`}>
            <strong>{recipe.title}</strong>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;
