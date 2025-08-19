import { colors } from '@/constants/colors';
import { Meal } from '@/types/meal';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart } from 'lucide-react-native';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

interface RecipeCardProps {
  meal: Meal;
  onPress: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

export default function RecipeCard({ 
  meal, 
  onPress, 
  onFavoritePress,
  isFavorite = false 
}: RecipeCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.imageOverlay}
        />
        {onFavoritePress && (
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={onFavoritePress}
          >
            <View style={[styles.favoriteGlow, isFavorite && styles.favoriteGlowActive]}>
              <Heart 
                size={18} 
                color={isFavorite ? colors.error : colors.white}
                fill={isFavorite ? colors.error : 'transparent'}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {meal.strMeal}
        </Text>
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
      
      {/* Glow effect */}
      <View style={styles.cardGlow} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    flexGrow: 1,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    marginBottom: 20,
    overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 22,
    backgroundColor: colors.primaryGlow,
    opacity: 0.1,
    zIndex: -1,
  },
  imageContainer: {
    position: 'relative',
    height: 140,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  favoriteGlow: {
    backgroundColor: colors.glass,
    borderRadius: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  favoriteGlowActive: {
    backgroundColor: colors.errorGlow,
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
    lineHeight: 20,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    fontSize: 11,
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
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});