import RecipeCard from '@/components/RecipeCard';
import { colors } from '@/constants/colors';
import { mealdbService } from '@/services/mealdb';
import { favoritesStyles as styles } from '@/styles/favorites.style';
import { Meal } from '@/types/meal';
import { favoritesService } from '@/utils/favorites';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native';

export default function FavoritesScreen() {
  const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const favoriteIds = await favoritesService.getFavorites();
      setFavorites(favoriteIds);
      
      if (favoriteIds.length > 0) {
        const meals = await Promise.all(
          favoriteIds.map(id => mealdbService.getMealDetails(id))
        );
        setFavoriteMeals(meals.filter(meal => meal !== null));
      } else {
        setFavoriteMeals([]);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoritePress = async (mealId: string) => {
    await favoritesService.removeFavorite(mealId);
    setFavorites(favorites.filter(id => id !== mealId));
    setFavoriteMeals(favoriteMeals.filter(meal => meal.idMeal !== mealId));
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading your favorites...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Favorites ❤️</Text>
        <Text style={styles.subtitle}>
          {favoriteMeals.length} saved recipe{favoriteMeals.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {favoriteMeals.length > 0 ? (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.recipesGrid}>
            {favoriteMeals.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                meal={meal}
                onPress={() => router.push(`/recipe/${meal.idMeal}`)}
                onFavoritePress={() => handleFavoritePress(meal.idMeal)}
                isFavorite={true}
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>💔</Text>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>
            Start exploring recipes and tap the heart icon to save them here
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
