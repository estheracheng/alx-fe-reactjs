import { useState } from 'react'
import useRecipeStore from './recipeStore'

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [prepTime, setPrepTime] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    
    const recipeData = {
      id: Date.now(),
      title,
      description,
      ...(ingredients && { 
        ingredients: ingredients.split(',').map(item => item.trim()).filter(item => item) 
      }),
      ...(prepTime && { prepTime: parseInt(prepTime) })
    }
    
    addRecipe(recipeData)
    setTitle('')
    setDescription('')
    setIngredients('')
    setPrepTime('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h2>Add New Recipe</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          required
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
          required
          rows="3"
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
        />
        
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredients (comma-separated, e.g., flour, sugar, eggs)"
          rows="2"
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
        />
        
        <input
          type="number"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          placeholder="Preparation time (minutes)"
          min="1"
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', width: '200px' }}
        />
        
        <button 
          type="submit" 
          style={{ 
            padding: '12px 20px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontSize: '16px',
            alignSelf: 'flex-start'
          }}
        >
          Add Recipe
        </button>
      </div>
    </form>
  )
}

export default AddRecipeForm