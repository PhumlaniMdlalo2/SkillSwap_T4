import React from 'react';
import { Stack, Redirect } from 'expo-router';
import LoadingSpinner from '../../src/components/ui/LoadingSpinner';
import { useAuth } from '../../src/store/useAppHooks';

export default function AuthLayout() {
  const { user, isAuthenticated, initializing } = useAuth();

  if (initializing) return <LoadingSpinner />;
  if (isAuthenticated) {
    // A freshly registered user is authenticated but still has to finish
    // onboarding, so don't send them straight to the tabs here.
    return (
      <Redirect href={user?.onboarding_completed === false ? '/(onboarding)/teach' : '/(tabs)'} />
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
