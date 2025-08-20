import RecipeCard from '@/components/RecipeCard';
import { colors } from '@/constants/colors';
import { mealdbService } from '@/services/mealdb';
import { Meal } from '@/types/meal';
import { favoritesService } from '@/utils/favorites';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CategoryScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (name) {
      loadMeals();
      loadFavorites();
    }
  }, [name]);

  const loadMeals = async () => {
    try {
      const categoryMeals = await mealdbService.getMealsByCategory(name!);
      setMeals(categoryMeals);
    } catch (error) {
      console.error('Error loading category meals:', error);
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
      setFavorites(favorites.filter((id) => id !== mealId));
    } else {
      await favoritesService.addFavorite(mealId);
      setFavorites([...favorites, mealId]);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading {name} recipes...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{meals.length} recipes</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.recipesGrid}>
          {meals.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              meal={meal}
              onPress={() => router.push(`/recipe/${meal.idMeal}`)}
              onFavoritePress={() => handleFavoritePress(meal.idMeal)}
              isFavorite={favorites.includes(meal.idMeal)}
              buttons={false}
              description={false}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  recipesGrid: {
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
