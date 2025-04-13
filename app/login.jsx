import { useRouter } from "expo-router";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import TextField from "./components/inputs/TextField";
import PasswordField from "./components/inputs/PasswordField";
import DividerWithText from "./components/others/DividerWithText";
import { useState } from "react";
import ThirdPartyContainer from "./components/containers/ThirdPartyContainer";
import ThirdPartyButton from "./components/buttons/ThirdPartyButton";
import SubmitButton from "./components/buttons/SubmitButton";
import OtherOption from "./components/others/OtherOption";
import Logos from "./components/logos/Logo";
import { signIn } from "../helpers/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter your email and password.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await signIn(email, password);
            await AsyncStorage.setItem("token", response.token);
            router.push("/(tabs)");
        } catch (error) {
            Alert.alert("Error", error.message || "Failed to sign in. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const navigateToSignUp = () => router.push("/signup");

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Log In</Text>

                <TextField label="Your Email" value={email} onChangeText={setEmail} placeholder="Enter your email" keyboardType="email-address" autoCapitalize="none" isEmail={true} />

                <PasswordField
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    isPasswordVisible={isPasswordVisible}
                    togglePasswordVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
                />

                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forget password?</Text>
                </TouchableOpacity>

                <SubmitButton text="Log In" onPress={handleLogin} style={styles.loginButton} textStyle={styles.loginText} isLoading={isLoading} />

                <OtherOption textContent={"Don't have an account?"} linkContent={"Sign up"} onPress={navigateToSignUp} />

                <DividerWithText text="Or login with" />

                <ThirdPartyContainer>
                    <ThirdPartyButton iconName="logo-google" size={40}>
                        <Logos logoType="google" size={40} />
                    </ThirdPartyButton>
                    <ThirdPartyButton iconName="logo-facebook" size={40}>
                        <Logos logoType="facebook" size={40} />
                    </ThirdPartyButton>
                </ThirdPartyContainer>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F7F7F7",
        paddingHorizontal: 20,
    },
    content: {
        width: "90%",
        maxWidth: 400,
        backgroundColor: "white",
        padding: 25,
        borderRadius: 15,
        alignItems: "center",
        marginTop: 50,
        elevation: 3,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 20,
    },
    forgotPassword: {
        width: "100%",
        alignItems: "flex-end",
        marginVertical: 15,
    },
    forgotPasswordText: {
        color: "#3D5CFF",
        fontSize: 14,
        fontWeight: "500",
    },
});
