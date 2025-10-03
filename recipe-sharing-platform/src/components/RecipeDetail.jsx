import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch('/src/data.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setRecipe(found);
      })
      .catch((err) => console.error('Failed to load recipe data:', err));
  }, [id]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-700">
        Loading...
      </div>
    );
  }

  // For demo, we add ingredients and steps as mock data here
  const ingredients = [
    '1 cup ingredient A',
    '2 cups ingredient B',
    '1 tbsp ingredient C',
  ];

  const steps = [
    'Step 1: Prepare the ingredients.',
    'Step 2: Mix everything thoroughly.',
    'Step 3: Cook for 20 minutes at 180°C.',
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto">
      <Link
        to="/"
        className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block"
      >
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h1>

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <p className="text-gray-700 mb-6">{recipe.summary}</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Cooking Steps</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          {steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default RecipeDetail;
