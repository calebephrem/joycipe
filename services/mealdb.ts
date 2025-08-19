const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const mealdbService = {
  // Get random meals
  getRandomMeals: async (count: number = 10): Promise<any[]> => {
    const meals = [];
    for (let i = 0; i < count; i++) {
      try {
        const response = await fetch(`${BASE_URL}/random.php`);
        const data = await response.json();
        if (data.meals && data.meals[0]) {
          meals.push(data.meals[0]);
        }
      } catch (error) {
        console.error('Error fetching random meal:', error);
      }
    }
    return meals;
  },

  // Get categories
  getCategories: async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories.php`);
      const data = await response.json();
      return data.categories || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  // Get meals by category
  getMealsByCategory: async (category: string) => {
    try {
      const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error fetching meals by category:', error);
      return [];
    }
  },

  // Search meals
  searchMeals: async (query: string) => {
    try {
      const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error searching meals:', error);
      return [];
    }
  },

  // Get meal details
  getMealDetails: async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
      const data = await response.json();
      return data.meals ? data.meals[0] : null;
    } catch (error) {
      console.error('Error fetching meal details:', error);
      return null;
    }
  },
};