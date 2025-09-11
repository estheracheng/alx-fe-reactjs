import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  setRecipes: (recipes) => set({ recipes }),
}));









// import { create } from 'zustand';

// export const useRecipeStore = create((set) => ({
//   recipes: [],
//     favorites: [],
//   recommendations: [],
//   searchTerm: '',
//   filteredRecipes: [],
  
//   // Actions
//   addRecipe: (newRecipe) =>
//     set((state) => ({ recipes: [...state.recipes, newRecipe] })),

//   updateRecipe: (updatedRecipe) =>
//     set((state) => ({
//       recipes: state.recipes.map((recipe) =>
//         recipe.id === updatedRecipe.id ? updatedRecipe : recipe
//       ),
//     })),

//  deleteRecipe: (id) =>
//     set((state) => ({
//       recipes: state.recipes.filter((recipe) => recipe.id !== id),
//       favorites: state.favorites.filter((favId) => favId !== id), // remove from favorites too
//     })),

//       // Favorites actions
//   addFavorite: (recipeId) =>
//     set((state) => ({
//       favorites: state.favorites.includes(recipeId)
//         ? state.favorites
//         : [...state.favorites, recipeId],
//     })),

//   removeFavorite: (recipeId) =>
//     set((state) => ({
//       favorites: state.favorites.filter((id) => id !== recipeId),
//     })),

//     // Simple recommendations based on favorites
//   generateRecommendations: () =>
//     set((state) => {
//       if (state.favorites.length === 0) {
//         return { recommendations: [] };
//       }

//       // Example mock logic: recommend random recipes not in favorites
//       const recommended = state.recipes.filter(
//         (recipe) => !state.favorites.includes(recipe.id) && Math.random() > 0.5
//       );

//       return { recommendations: recommended };
//     }),

//   setRecipes: (recipes) => set({ recipes }),

//   setSearchTerm: (term) => 
//     set((state) => {
//       const filtered = state.recipes.filter((recipe) =>
//         recipe.title.toLowerCase().includes(term.toLowerCase())
//       );
//       return { searchTerm: term, filteredRecipes: filtered };
//     }),
// }));
