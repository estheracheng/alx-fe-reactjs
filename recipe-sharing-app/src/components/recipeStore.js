import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
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
    return { recipes: updatedRecipes }
  }),
  setRecipes: (recipes) => set({ recipes, filteredRecipes: recipes })
}))

export default useRecipeStore