import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  favorites: [],
  recommendations: [],
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  filteredRecipes: [],
  filterRecipes: () => {
    const { recipes, searchTerm } = get()
    if (!searchTerm.trim()) {
      set({ filteredRecipes: recipes })
      return
    }
    
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (recipe.ingredients && recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    )
    set({ filteredRecipes: filtered })
  },
  
  // Favorites actions
  addFavorite: (recipeId) => set((state) => {
    // Prevent duplicate favorites
    if (state.favorites.includes(recipeId)) {
      return state
    }
    return { favorites: [...state.favorites, recipeId] }
  }),
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  isFavorite: (recipeId) => {
    return get().favorites.includes(recipeId)
  },
  
  // Recommendations actions
  generateRecommendations: () => set((state) => {
    if (state.favorites.length === 0) {
      // If no favorites, show random recipes
      const shuffled = [...state.recipes].sort(() => 0.5 - Math.random())
      return { recommendations: shuffled.slice(0, 3) }
    }
    
    // Generate recommendations based on favorite recipe categories
    const favoriteRecipes = state.favorites.map(id => 
      state.recipes.find(recipe => recipe.id === id)
    ).filter(recipe => recipe !== undefined)
    
    // Extract categories from favorite recipes (using ingredients as categories)
    const favoriteCategories = new Set()
    favoriteRecipes.forEach(recipe => {
      if (recipe.ingredients) {
        recipe.ingredients.forEach(ingredient => {
          favoriteCategories.add(ingredient.toLowerCase())
        })
      }
    })
    
    // Find recipes that share categories with favorites but aren't already favorites
    const recommended = state.recipes
      .filter(recipe => !state.favorites.includes(recipe.id))
      .filter(recipe => {
        if (!recipe.ingredients) return false
        return recipe.ingredients.some(ingredient => 
          favoriteCategories.has(ingredient.toLowerCase())
        )
      })
      .sort(() => 0.5 - Math.random())
      .slice(0, 5) // Limit to 5 recommendations
    
    return { recommendations: recommended }
  }),
  
  // Recipe management actions
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, newRecipe],
    filteredRecipes: [...state.filteredRecipes, newRecipe]
  })),
  updateRecipe: (id, updatedRecipe) => set((state) => {
    const updatedRecipes = state.recipes.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
    return { recipes: updatedRecipes }
  }),
  deleteRecipe: (id) => set((state) => {
    const updatedRecipes = state.recipes.filter(recipe => recipe.id !== id)
    // Also remove from favorites if it was favorited
    const updatedFavorites = state.favorites.filter(favId => favId !== id)
    return { 
      recipes: updatedRecipes, 
      favorites: updatedFavorites 
    }
  }),
  setRecipes: (recipes) => set({ recipes, filteredRecipes: recipes })
}))

export default useRecipeStore