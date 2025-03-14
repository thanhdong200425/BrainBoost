import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import TextField from "./components/inputs/TextField";
import PasswordField from "./components/inputs/PasswordField"; 
import SubmitButton from "./components/buttons/SubmitButton";
import OtherOption from "./components/others/OtherOption";
import DividerWithText from "./components/others/DividerWithText";
import ThirdPartyContainer from "./components/containers/ThirdPartyContainer";
import ThirdPartyButton from "./components/buttons/ThirdPartyButton";
import Logos from './components/logos/Logo';

export default function SignUpScreen() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isFocusOnConfirmPassword, setIsFocusOnConfirmPassword] = useState(false);

    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    useEffect(() => {
        if (!isFocusOnConfirmPassword && confirmPassword.length > 0 && password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
        } else {
            setConfirmPasswordError("");
        }
    }, [isFocusOnConfirmPassword, confirmPassword, password]);

    const handleSignUp = () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }
        if (confirmPasswordError) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }
        Alert.alert("Success", "Sign up successful!");
        router.push("/login");
    };

    const navigateToLogIn = () => router.push("/login");

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Sign Up</Text>

                <TextField 
                    label="Your Email" 
                    value={email} 
                    onChangeText={setEmail} 
                    placeholder="Enter your email" 
                    keyboardType="email-address" 
                    autoCapitalize="none" 
                    isEmail={true} 
                />

                <PasswordField 
                    label="Password" 
                    value={password} 
                    onChangeText={setPassword} 
                    placeholder="Enter your password"
                    error={""} 
                    isPasswordVisible={isPasswordVisible}
                    togglePasswordVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
                />

                <PasswordField 
                    label="Confirm Password" 
                    value={confirmPassword} 
                    onChangeText={setConfirmPassword} 
                    placeholder="Confirm your password"
                    error={confirmPasswordError}
                    isPasswordVisible={isConfirmPasswordVisible}
                    togglePasswordVisibility={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                />

                <SubmitButton text="Sign Up" onPress={handleSignUp} />

                <OtherOption textContent={"Already have an account?"} linkContent={"Log In"} onPress={navigateToLogIn} />

                <DividerWithText text="Or sign up with" />

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
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 10,
        alignSelf: "flex-start",
    },
});