import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LoadingSpinner from '../../src/components/ui/LoadingSpinner';
import { useAuth } from '../../src/store/useAppHooks';
import { COLORS } from '../../src/utils/constants';

const ICONS = {
  index: 'home',
  explore: 'search',
  swap: 'sparkles',
  messages: 'chatbubbles',
  wallet: 'wallet',
  profile: 'person',
};

export default function TabsLayout() {
  const { user, isAuthenticated, initializing } = useAuth();

  if (initializing) return <LoadingSpinner />;
  if (!isAuthenticated) return <Redirect href="/(auth)/welcome" />;
  if (user?.onboarding_completed === false) return <Redirect href="/(onboarding)/teach" />;

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textFaint,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: { fontSize: 10 },
        tabBarStyle: { backgroundColor: COLORS.surface, borderTopColor: COLORS.border },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={`${ICONS[route.name]}${focused ? '' : '-outline'}`}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="swap" options={{ title: 'Swap' }} />
      <Tabs.Screen name="messages" options={{ title: 'Chat' }} />
      <Tabs.Screen name="wallet" options={{ title: 'Wallet' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
