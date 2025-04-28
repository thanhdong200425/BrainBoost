import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';

export function useProtectedRoute() {
    const [isLoading, setIsLoading] = useState(true);
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
    const authToken = useSelector((state) => state.auth.accessToken);
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const seen = await AsyncStorage.getItem('hasSeenOnboarding');
                setHasSeenOnboarding(seen === 'true');
            } catch (e) {
                console.error('Failed to load onboarding status', e);
                setHasSeenOnboarding(false);
            } finally {
                setIsLoading(false);
            }
        };
        checkStatus();
    }, []);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        const inAuthGroup = segments[0] === 'auth';
        const inOnboardingGroup = segments[0] === 'onboarding';

        if (!hasSeenOnboarding && !inOnboardingGroup) {
            router.replace('/onboarding/onboarding01');
        } else if (hasSeenOnboarding && !authToken && !inAuthGroup && !inOnboardingGroup) {
            router.replace('/auth/login');
        } else if (hasSeenOnboarding && authToken && (inAuthGroup || inOnboardingGroup)) {
            router.replace('/(tabs)');
        }
    }, [isLoading, hasSeenOnboarding, authToken, segments, router]);

    return { isLoading, hasSeenOnboarding, authToken };
}
