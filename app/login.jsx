// app/tabs/login.jsx
import { useRouter } from "expo-router";
import { StyleSheet, View, Text, Alert } from "react-native";
import TextField from "./components/inputs/TextField";
import PasswordField from "./components/inputs/PasswordField";
import DividerWithText from "./components/others/DividerWithText";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import ThirdPartyContainer from "./components/containers/ThirdPartyContainer";
import ThirdPartyButton from "./components/buttons/ThirdPartyButton";
import SubmitButton from "./components/buttons/SubmitButton";
import OtherOption from "./components/others/OtherOption";

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter your email and password.");
            return;
        }
        router.push("/(tabs)");
    };

    const navigateToSignUp = () => router.push("/signup");

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Log In</Text>

                <TextField label="Your Email" value={email} onChangeText={setEmail} placeholder="Enter your email" keyboardType="email-address" autoCapitalize="none" isEmail={true} />

                <PasswordField label="Password" value={password} onChangeText={setPassword} placeholder="Enter your password" secureTextEntry={true} />

                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forget password?</Text>
                </TouchableOpacity>

                <SubmitButton text="Log In" onPress={handleLogin} style={styles.loginButton} textStyle={styles.loginText} />

                <OtherOption textContent={"Don't have an account?"} linkContent={"Sign up"} onPress={navigateToSignUp} />

                <DividerWithText text="Or login with" />

                <ThirdPartyContainer>
                    <ThirdPartyButton iconName="logo-google" size={24} color={"white"} />
                    <ThirdPartyButton iconName="logo-facebook" size={24} color={"white"} />
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
        width: "100%",
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
    googleIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
});
