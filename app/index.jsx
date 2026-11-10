import React from 'react';
import { Redirect } from 'expo-router';
import LoadingSpinner from '../src/components/ui/LoadingSpinner';
import { useAuth } from '../src/store/useAppHooks';

export default function Index() {
  const { user, isAuthenticated, initializing } = useAuth();

  if (initializing) return <LoadingSpinner />;
  if (!isAuthenticated) return <Redirect href="/(auth)/welcome" />;

  return (
    <Redirect href={user?.onboarding_completed === false ? '/(onboarding)/teach' : '/(tabs)'} />
  );
}
