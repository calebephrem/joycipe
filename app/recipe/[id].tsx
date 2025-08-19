import { colors } from '@/constants/colors';
import { mealdbService } from '@/services/mealdb';
import { Meal } from '@/types/meal';
import { favoritesService } from '@/utils/favorites';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Clock, Heart, Users } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      loadMealDetails();
      checkFavoriteStatus();
    }
  }, [id]);

  const loadMealDetails = async () => {
    try {
      const mealData = await mealdbService.getMealDetails(id!);
      setMeal(mealData);
    } catch (error) {
      console.error('Error loading meal details:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async () => {
    const favorite = await favoritesService.isFavorite(id!);
    setIsFavorite(favorite);
  };

  const handleFavoritePress = async () => {
    if (isFavorite) {
      await favoritesService.removeFavorite(id!);
      setIsFavorite(false);
    } else {
      await favoritesService.addFavorite(id!);
      setIsFavorite(true);
    }
  };

  const getIngredients = (meal: Meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof Meal];
      const measure = meal[`strMeasure${i}` as keyof Meal];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure?.trim() || '',
        });
      }
    }
    return ingredients;
  };

  const openYoutube = (link: string) => {
    Linking.openURL(link);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading recipe...</Text>
      </View>
    );
  }

  if (!meal) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Recipe not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const ingredients = getIngredients(meal);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleFavoritePress}
            >
              <Heart
                size={24}
                color={isFavorite ? colors.error : colors.white}
                fill={isFavorite ? colors.error : 'transparent'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{meal.strMeal}</Text>
            <View style={styles.tags}>
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                style={styles.categoryTag}
              >
                <Text style={styles.categoryText}>{meal.strCategory}</Text>
              </LinearGradient>
              <View style={styles.countryTag}>
                <Text style={styles.countryText}>🌍 {meal.strArea}</Text>
              </View>
            </View>
          </View>

          <View style={styles.stats}>
            <View style={styles.statTag}>
              <Clock size={16} color={colors.secondary} />
              <Text style={styles.statText}>30 min</Text>
            </View>
            <View style={styles.statTag}>
              <Users size={16} color={colors.secondary} />
              <Text style={styles.statText}>4 servings</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {ingredients.map((item, index) => (
                <View key={index} style={styles.ingredient}>
                  <Text style={styles.ingredientText}>
                    {item.measure} {item.ingredient}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructions}>{meal.strInstructions}</Text>
          </View>

          {meal.strYoutube && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Video Tutorial</Text>
              <TouchableOpacity
                style={styles.videoButton}
                onPress={() => openYoutube(meal.strYoutube!)}
              >
                <LinearGradient
                  colors={[colors.error, '#C53030']}
                  style={styles.videoButtonGradient}
                >
                  <Text style={styles.videoButtonText}>Watch on YouTube</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
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
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary,
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },
  backButtonText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: width,
    height: 300,
  },
  headerButtons: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  headerButton: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 24,
    padding: 8,
    shadowColor: colors.surfaceGlow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    padding: 24,
    backgroundColor: colors.background,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
    lineHeight: 40,
    textShadowColor: colors.primaryGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  categoryText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
  },
  countryTag: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  countryText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: colors.secondaryGlow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  statText: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
    textShadowColor: colors.secondaryGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  ingredientsList: {
    gap: 12,
  },
  ingredient: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    padding: 12,
    borderRadius: 12,
    shadowColor: colors.surfaceGlow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ingredientText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  videoButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  videoButtonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  videoButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});
