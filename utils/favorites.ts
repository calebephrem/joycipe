import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'recipe_favorites';

export const favoritesService = {
  // Get all favorites
  getFavorites: async (): Promise<string[]> => {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  // Add to favorites
  addFavorite: async (mealId: string): Promise<void> => {
    try {
      const favorites = await favoritesService.getFavorites();
      if (!favorites.includes(mealId)) {
        favorites.push(mealId);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  },

  // Remove from favorites
  removeFavorite: async (mealId: string): Promise<void> => {
    try {
      const favorites = await favoritesService.getFavorites();
      const updatedFavorites = favorites.filter(id => id !== mealId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  },

  // Check if meal is favorite
  isFavorite: async (mealId: string): Promise<boolean> => {
    try {
      const favorites = await favoritesService.getFavorites();
      return favorites.includes(mealId);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  },
};