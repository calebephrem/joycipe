import { auth, db } from '@/config/firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';

const FAVORITES_KEY = 'recipe_favorites';

export const collectionRef = collection(db, 'favorites');

interface Favorite {
  id: string;
  userId: string;
  mealIds: string[];
}

export const favoritesService = {
  // Get all favorites
  getFavorites: async (): Promise<string[]> => {
    try {
      const favoritesSnapshot = await getDocs(collectionRef);
      const mealIds = favoritesSnapshot.docs
        .filter((doc) => doc.data().userId === auth?.currentUser?.uid)
        .flatMap((doc) => doc.data().mealIds ?? []);

      return mealIds;
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  // Add to favorites
  addFavorite: async (mealId: string): Promise<void> => {
    try {
      const favoritesSnapshot = await getDocs(collectionRef);
      const favorites: Favorite[] = favoritesSnapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            userId: data.userId,
            mealIds: data.mealIds ?? [],
          };
        })
        .filter((fav) => fav.userId === auth?.currentUser?.uid);

      const userFavorite = favorites[0]; // assuming one favorites doc per user

      if (userFavorite && !userFavorite.mealIds.includes(mealId)) {
        const documentRef = doc(db, 'favorites', userFavorite.id);
        await updateDoc(documentRef, {
          mealIds: [...userFavorite.mealIds, mealId],
        });
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  },

  // Remove from favorites
  removeFavorite: async (mealId: string): Promise<void> => {
    try {
      const favoritesSnapshot = await getDocs(collectionRef);
      const userFavoritesDoc = favoritesSnapshot.docs.find(
        (doc) => doc.data().userId === auth?.currentUser?.uid
      );

      if (!userFavoritesDoc) return;

      const data = userFavoritesDoc.data();
      const updatedMealIds = (data.mealIds ?? []).filter(
        (id: string) => id !== mealId
      );

      const documentRef = doc(db, 'favorites', userFavoritesDoc.id);
      await updateDoc(documentRef, { mealIds: updatedMealIds });
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  },

  // Check if meal is favorite
  isFavorite: async (mealId: string): Promise<boolean> => {
    try {
      const favoritesSnapshot = await getDocs(collectionRef);
      const userFavoritesDoc = favoritesSnapshot.docs.find(
        (doc) => doc.data().userId === auth?.currentUser?.uid
      );

      if (!userFavoritesDoc) return false;

      const mealIds: string[] = userFavoritesDoc.data().mealIds ?? [];
      return mealIds.includes(mealId);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  },
};
