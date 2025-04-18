import { useRouter } from "expo-router";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../services/authService";
import { setCredentials } from "../redux/slices/authSlice";
import { TextField, PasswordField, DividerWithText, ThirdPartyContainer, ThirdPartyButton, SubmitButton, OtherOption, Logo } from "../components";

export default function LoginScreen() {
    const router = useRouter();
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const mutation = useMutation({
        mutationFn: signIn,
        onSuccess: async (data) => {
            await AsyncStorage.setItem('token', data.token)
            dispatch(setCredentials({
                accessToken: data.token
            }))
            router.push("/(tabs)")
        },
        onError: (error) => {
            Alert.alert("Login error: ", error.message || "An unexpected error occurred. Please try again.");
        }
    })

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter your email and password.");
            return;
        }

        mutation.mutate({email, password})
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

                <SubmitButton text="Log In" onPress={handleLogin} style={styles.loginButton} textStyle={styles.loginText} />

                <OtherOption textContent={"Don't have an account?"} linkContent={"Sign up"} onPress={navigateToSignUp} />

                <DividerWithText text="Or login with" />

                <ThirdPartyContainer>
                    <ThirdPartyButton iconName="logo-google" size={40}>
                        <Logo logoType="google" size={40} />
                    </ThirdPartyButton>
                    <ThirdPartyButton iconName="logo-facebook" size={40}>
                        <Logo logoType="facebook" size={40} />
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
