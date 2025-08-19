import { colors } from '@/constants/colors';
import { settingsStyles as styles } from '@/styles/settings.style';
import { router } from 'expo-router';
import { Bell, ChevronRight, CircleHelp as HelpCircle, LogOut, User } from 'lucide-react-native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
}

function SettingItem({ icon, title, subtitle, onPress, showArrow = true }: SettingItemProps) {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showArrow && (
        <ChevronRight size={20} color={colors.gray400} />
      )}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const handleSignOut = () => {
    // This is where you'll handle Firebase sign out
    router.replace('/(auth)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={<User size={20} color={colors.primary} />}
              title="Profile"
              subtitle="Manage your account information"
              onPress={() => {}}
            />
            <SettingItem
              icon={<Bell size={20} color={colors.primary} />}
              title="Notifications"
              subtitle="Push notifications and email preferences"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={<HelpCircle size={20} color={colors.primary} />}
              title="Help & Support"
              subtitle="Get help with the app"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={<LogOut size={20} color={colors.error} />}
              title="Sign Out"
              onPress={handleSignOut}
              showArrow={false}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Joycipe v1.0.0</Text>
          <Text style={styles.footerSubtext}>Made with ❤️ for food lovers</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
