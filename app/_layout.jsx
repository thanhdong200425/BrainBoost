import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient();

export default function RootLayout() {
    const router = useRouter();

    useEffect(() => {
        router.push("/onboarding01");
    }, []);
    return (
        <GestureHandlerRootView style={styles.container}>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="onboarding01" />
                        <Stack.Screen name="signup" />
                        <Stack.Screen name="login" />
                    </Stack>
                </Provider>
            </QueryClientProvider>
            <Toast />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
