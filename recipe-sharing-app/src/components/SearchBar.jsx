import { useEffect } from 'react'
import useRecipeStore from './recipeStore'

const SearchBar = () => {
  const searchTerm = useRecipeStore(state => state.searchTerm)
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm)
  const filterRecipes = useRecipeStore(state => state.filterRecipes)

  // Trigger filtering whenever search term changes
  useEffect(() => {
    filterRecipes()
  }, [searchTerm, filterRecipes])

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search recipes by title, description, or ingredients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '10px',
          width: '100%',
          maxWidth: '400px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '16px'
        }}
      />
    </div>
  )
}

export default SearchBar