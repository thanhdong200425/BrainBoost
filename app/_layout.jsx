import { router, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "../redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {useProtectedRoute} from "../customHooks/useProtectedRoute";

const queryClient = new QueryClient();

const toastConfig = {
    position: 'top'
};


function RootLayoutNavigation() {
    useEffect(() => {
        router.replace('/onboarding/onboarding01')
    }, [])

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="decks" />
            <Stack.Screen name="learning" />
            <Stack.Screen name="result" />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={styles.container}>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <RootLayoutNavigation />
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
