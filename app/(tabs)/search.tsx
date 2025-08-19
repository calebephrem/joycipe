import RecipeCard from '@/components/RecipeCard';
import { colors } from '@/constants/colors';
import { mealdbService } from '@/services/mealdb';
import { searchStyles as styles } from '@/styles/search.style';
import { Meal } from '@/types/meal';
import { favoritesService } from '@/utils/favorites';
import { router } from 'expo-router';
import { Search } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const meals = await mealdbService.searchMeals(searchQuery);
      setResults(meals || []);

      // Load favorites
      const favs = await favoritesService.getFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Recipes</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.gray400} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for recipes..."
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              handleSearch(text);
            }}
            placeholderTextColor={colors.gray400}
          />
        </View>
      </View>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      <ScrollView style={styles.results} showsVerticalScrollIndicator={false}>
        {results.length > 0 ? (
          <View style={styles.recipesGrid}>
            {results.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                meal={meal}
                onPress={() => router.push(`/recipe/${meal.idMeal}`)}
                onFavoritePress={() => handleFavoritePress(meal.idMeal)}
                isFavorite={favorites.includes(meal.idMeal)}
              />
            ))}
          </View>
        ) : query.trim() && !loading ? (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No recipes found</Text>
            <Text style={styles.noResultsSubtext}>
              Try searching for something else
            </Text>
          </View>
        ) : !query.trim() ? (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>🔍</Text>
            <Text style={styles.placeholderTitle}>Discover Recipes</Text>
            <Text style={styles.placeholderSubtext}>
              Search for your favorite dishes and ingredients
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
