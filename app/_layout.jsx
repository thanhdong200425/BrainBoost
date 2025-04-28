import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "../redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";

const queryClient = new QueryClient();

const toastConfig = {
    position: 'top'
};

function AuthContextProvider() {
    const router = useRouter();
    const segments = useSegments();
    const [isReady, setIsReady] = useState(false);
    const [firstTime, setFirstTime] = useState(true);
    const [authChecked, setAuthChecked] = useState(false);

    const authToken = useSelector((state) => state.auth.accessToken);

    const checkOnboarding = async () => {
        try {
            const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
            setFirstTime(hasSeenOnboarding !== 'true');
        } catch (error) {
            console.error('Error checking onboarding status:', error);
        }
    };

    useEffect(() => {
        checkOnboarding();
        setAuthChecked(true);
    }, []);

    useEffect(() => {
        if (!authChecked) return;

        const inAuthGroup = segments[0] === 'auth';
        const inOnboardingGroup = segments[0] === 'onboarding';
        
        // Navigation logic based on auth state and onboarding status
        if (!isReady) {
            setIsReady(true);
            return;
        }

        // If no segments, determine where to redirect
        if (segments.length === 0) {
            if (firstTime) {
                router.replace('/onboarding/onboarding01');
            } else if (!authToken) {
                router.replace('/auth/login');
            } else {
                router.replace('/(tabs)');
            }
            return;
        }

        // Handle specific navigation cases
        if (firstTime && !inOnboardingGroup) {
            // First-time users should see onboarding
            router.replace('/onboarding/onboarding01');
        } else if (!firstTime && !authToken && !inAuthGroup && !inOnboardingGroup) {
            // Users who completed onboarding but are not logged in should go to login
            router.replace('/auth/login');
        } else if (authToken && (inAuthGroup || inOnboardingGroup)) {
            // Authenticated users should go to main app if they try to access auth or onboarding
            router.replace('/(tabs)');
        }
    }, [segments, authChecked, firstTime, authToken, isReady]);

    return null;
}

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={styles.container}>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <AuthContextProvider />
                        <Stack screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="(tabs)" />
                            <Stack.Screen name="onboarding" />
                            <Stack.Screen name="auth" />
                            <Stack.Screen name="decks" />
                            <Stack.Screen name="learning" />
                            <Stack.Screen name="result" />
                        </Stack>
                    </Provider>
                </QueryClientProvider>
                <Toast config={toastConfig} />
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
