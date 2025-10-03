import React, { useState } from 'react';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({});

  // Simple validation function
  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    
    // Check ingredients have at least 2 items separated by new lines or commas
    const ingredientsList = ingredients.split(/[\n,]+/).map(i => i.trim()).filter(i => i);
    if (ingredientsList.length < 2) newErrors.ingredients = 'Please enter at least 2 ingredients';

    // Steps validation: at least one step (can be multiple lines)
    const stepsList = steps.split(/[\n]+/).map(s => s.trim()).filter(s => s);
    if (stepsList.length < 1) newErrors.steps = 'Please enter at least one preparation step';

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Here you can send the data to backend or update state
      const newRecipe = {
        title,
        ingredients: ingredients.split(/[\n,]+/).map(i => i.trim()).filter(i => i),
        steps: steps.split(/[\n]+/).map(s => s.trim()).filter(s => s),
      };

      console.log('New Recipe:', newRecipe);

      // Reset form
      setTitle('');
      setIngredients('');
      setSteps('');
      setErrors({});
      alert('Recipe submitted successfully!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Add a New Recipe</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Title */}
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
              errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-500 mt-1 text-sm">{errors.title}</p>}
        </div>

        {/* Ingredients */}
        <div className="mb-5">
          <label htmlFor="ingredients" className="block mb-2 font-medium text-gray-700">
            Ingredients (separate by commas or new lines)
          </label>
          <textarea
            id="ingredients"
            rows="4"
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
              errors.ingredients ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
            }`}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>
          {errors.ingredients && <p className="text-red-500 mt-1 text-sm">{errors.ingredients}</p>}
        </div>

        {/* Preparation Steps */}
        <div className="mb-5">
          <label htmlFor="steps" className="block mb-2 font-medium text-gray-700">
            Preparation Steps (each step on a new line)
          </label>
          <textarea
            id="steps"
            rows="5"
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
              errors.steps ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
            }`}
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          ></textarea>
          {errors.steps && <p className="text-red-500 mt-1 text-sm">{errors.steps}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded transition-colors duration-300"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
