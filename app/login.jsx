// app/tabs/login.jsx
import { useRouter } from "expo-router";
import { StyleSheet, View, Text, Alert } from "react-native";
import TextField from "./components/input/TextField";
import PasswordField from "./components/input/PasswordField";
import DividerWithText from "./components/ui/DividerWithText";  
import Button from "./components/ui/Button";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";


export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter your email and password.");
        } else {
            router.push("/(tabs)"); 
            
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Log In</Text>

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
                    secureTextEntry={true}
                />


                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forget password?</Text>
                </TouchableOpacity>

                <Button
                    text="Log In"
                    onPress={handleLogin}
                    style={styles.loginButton}
                    textStyle={styles.loginText}
                />

                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Don't have an account?</Text>
                    <TouchableOpacity>
                        <Text style={styles.signUpLink}>Sign up</Text>
                    </TouchableOpacity>
                </View>

                <DividerWithText text="Or login with" />  

                <View style={styles.socialLoginContainer}>
                    <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                        <Ionicons name="logo-google" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                        <Ionicons name="logo-facebook" size={24} color="white" />
                    </TouchableOpacity>
                </View>
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

    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
    },
    signUpText: {
        fontSize: 14,
        color: "#6F6F6F",
    },
    signUpLink: {
        color: "#3D5CFF",
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 5,
    },
    
    socialLoginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginTop: 15,
    },
    socialButton: {
        backgroundColor: "#3D5CFF",
        borderRadius: 25,
        padding: 10,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 15,
    },
    googleIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
});
