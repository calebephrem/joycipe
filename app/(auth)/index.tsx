import { auth } from '@/config/firebase';
import { colors } from '@/constants/colors';
import { authStyles as styles } from '@/styles/auth.style';
import { collectionRef } from '@/utils/favorites';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Please enter both email and password');
      return;
    }

    if (isLogin) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const uid = userCredential.user.uid;

        await addDoc(collectionRef, {
          userId: uid,
          mealIds: [],
        });

        router.replace('/(tabs)');
      } catch (err) {
        console.error('Authentication error:', err);
        Alert.alert(
          'Authentication failed',
          'Something went wrong while authenticating. Please try again.'
        );
        return;
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);

        router.replace('/(tabs)');
      } catch (err) {
        console.error('Authentication error:', err);
        Alert.alert(
          'Authentication failed',
          'Something went wrong while authenticating. Please try again.'
        );
        return;
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[colors.background, colors.backgroundSecondary, colors.surface]}
        style={styles.gradient}
      >
        {/* Floating orbs for ambient lighting */}
        <View style={styles.orb1} />
        <View style={styles.orb2} />
        <View style={styles.orb3} />

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={styles.logoGradient}
              >
                <Text style={styles.logo}>🍳</Text>
              </LinearGradient>
            </View>
            <Text style={styles.title}>Joycipe</Text>
            <Text style={styles.subtitle}>
              Discover delicious recipes in the dark
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={colors.textTertiary}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor={colors.textTertiary}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleAuth}>
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text style={styles.switchText}>
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Sign In'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
