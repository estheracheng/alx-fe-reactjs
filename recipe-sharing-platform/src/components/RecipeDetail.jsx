import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Load the recipes data from your data.json file
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(r => r.id === parseInt(id));
        setRecipe(found);
      })
      .catch(console.error);
  }, [id]);

  if (!recipe) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md my-10">
      <Link to="/" className="text-indigo-600 hover:underline mb-4 inline-block">&larr; Back to Home</Link>

      <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded mb-6"
      />

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Summary</h2>
        <p className="text-gray-700">{recipe.summary}</p>
      </section>

      {recipe.ingredients && (
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside text-gray-700">
            {recipe.ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {recipe.steps && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Preparation Steps</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            {recipe.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
};

export default RecipeDetail;
