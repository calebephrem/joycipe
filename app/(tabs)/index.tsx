import CategoryCard from '@/components/CategoryCard';
import RecipeCard from '@/components/RecipeCard';
import { colors } from '@/constants/colors';
import { mealdbService } from '@/services/mealdb';
import { homeStyles as styles } from '@/styles/home.style';
import { Category, Meal } from '@/types/meal';
import { favoritesService } from '@/utils/favorites';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native';

export default function HomeScreen() {
  const [featuredMeals, setFeaturedMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadData();
    loadFavorites();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [meals, cats] = await Promise.all([
        mealdbService.getRandomMeals(12),
        mealdbService.getCategories(),
      ]);
      setFeaturedMeals(meals);
      setCategories(cats);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    const favs = await favoritesService.getFavorites();
    setFavorites(favs);
  };

  const handleFavoritePress = async (mealId: string) => {
    const isFav = favorites.includes(mealId);
    if (isFav) {
      await favoritesService.removeFavorite(mealId);
      setFavorites(favorites.filter(id => id !== mealId));
    } else {
      await favoritesService.addFavorite(mealId);
      setFavorites([...favorites, mealId]);
    }
  };

  const renderFeaturedMeal = ({ item }: { item: Meal }) => (
    <RecipeCard
      meal={item}
      onPress={() => router.push(`/recipe/${item.idMeal}`)}
      onFavoritePress={() => handleFavoritePress(item.idMeal)}
      isFavorite={favorites.includes(item.idMeal)}
    />
  );

  const renderCategory = ({ item }: { item: Category }) => (
    <CategoryCard
      category={item}
      onPress={() => router.push(`/category/${item.strCategory}`)}
    />
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading delicious recipes...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning! 👋</Text>
          <Text style={styles.title}>What would you like to cook today?</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories.slice(0, 8)}
            renderItem={renderCategory}
            keyExtractor={(item) => item.idCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Recipes</Text>
          <View style={styles.recipesGrid}>
            {featuredMeals.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                meal={meal}
                onPress={() => router.push(`/recipe/${meal.idMeal}`)}
                onFavoritePress={() => handleFavoritePress(meal.idMeal)}
                isFavorite={favorites.includes(meal.idMeal)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
