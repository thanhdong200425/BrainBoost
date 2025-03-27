import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
    const router = useRouter();

    useEffect(() => {
        router.push("/onboarding01");
    }, []);
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name= "onboarding01" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="login" />
        </Stack>
    );
}
