import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function RootLayout() {
    const router = useRouter();

    useEffect(() => {
        router.push("/onboarding01");
    }, []);
    return (
        <Provider store={store}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="onboarding01" />
                <Stack.Screen name="signup" />
                <Stack.Screen name="login" />
            </Stack>
        </Provider>
    );
}
