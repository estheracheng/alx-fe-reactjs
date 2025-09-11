import { useState } from 'react'
import useRecipeStore from './recipeStore'

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe)
  const [title, setTitle] = useState(recipe.title)
  const [description, setDescription] = useState(recipe.description)
  const [ingredients, setIngredients] = useState(recipe.ingredients ? recipe.ingredients.join(', ') : '')
  const [prepTime, setPrepTime] = useState(recipe.prepTime || '')
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    
    const updatedRecipe = {
      title,
      description,
      ...(ingredients && { 
        ingredients: ingredients.split(',').map(item => item.trim()).filter(item => item) 
      }),
      ...(prepTime && { prepTime: parseInt(prepTime) })
    }
    
    updateRecipe(recipe.id, updatedRecipe)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTitle(recipe.title)
    setDescription(recipe.description)
    setIngredients(recipe.ingredients ? recipe.ingredients.join(', ') : '')
    setPrepTime(recipe.prepTime || '')
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <button onClick={() => setIsEditing(true)}>
        Edit Recipe
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h3>Edit Recipe</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          rows="3"
          style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
        />
        
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredients (comma-separated)"
          rows="2"
          style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
        />
        
        <input
          type="number"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          placeholder="Preparation time (minutes)"
          min="1"
          style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '150px' }}
        />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}

export default EditRecipeForm