import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
  const navigate = useNavigate()
  const [isConfirming, setIsConfirming] = useState(false)

  const handleDelete = () => {
    deleteRecipe(recipeId)
    navigate('/')
  }

  if (!isConfirming) {
    return (
      <button 
        onClick={() => setIsConfirming(true)}
        style={{ backgroundColor: '#f44336', marginLeft: '10px' }}
      >
        Delete Recipe
      </button>
    )
  }

  return (
    <div>
      <p>Are you sure you want to delete this recipe?</p>
      <button onClick={handleDelete} style={{ backgroundColor: '#f44336' }}>
        Yes, Delete
      </button>
      <button 
        onClick={() => setIsConfirming(false)} 
        style={{ marginLeft: '10px' }}
      >
        Cancel
      </button>
    </div>
  )
}

export default DeleteRecipeButton