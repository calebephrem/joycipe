import { auth } from '@/config/firebase';
import { colors } from '@/constants/colors';
import { authStyles as styles } from '@/styles/auth.style';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
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

export default function ForgotpwdScreen() {
  const [email, setEmail] = useState('');

  const resetPassword = async (email: string): Promise<void> => {
    if (!email) {
      Alert.alert('Please enter your email');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Password reset email sent!',
        'Password reset email sent! Check your inbox to see the password reset link'
      );
      console.log('Password reset email sent!');
      router.replace('/(auth)');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error sending password reset email:', err);
        Alert.alert('Error sending password reset link', err.message);
      } else {
        console.error('Error sending password reset email:', err);
        Alert.alert(
          'Something went wrong',
          'Something went wrong sending password reset link'
        );
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
              Enter email to send password reset link
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
            <TouchableOpacity
              style={styles.button}
              onPress={() => resetPassword(email)}
            >
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Send</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
