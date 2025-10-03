import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map(recipe => (
        <Link
          to={`/recipe/${recipe.id}`}
          key={recipe.id}
          className="block rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
            <p className="text-gray-600">{recipe.summary}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
