import { useRouter } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = () => {
        if (email && password) {
            router.push("/(tabs)"); 
        } else {
            alert("Please enter your email and password.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Log In</Text>

                <Text style={styles.label}>Your Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={styles.eyeIcon}
                    >
                        <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} color="#A0A0A0" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forget password?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogin} style={styles.loginButton} activeOpacity={0.8}>
                    <Text style={styles.loginText}>Log In</Text>
                </TouchableOpacity>

                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Don't have an account?</Text>
                    <TouchableOpacity>
                        <Text style={styles.signUpLink}>Sign up</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.orText}>Or login with</Text>
                    <View style={styles.divider} />
                </View>

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
    label: {
        fontSize: 14,
        color: "#6F6F6F",
        alignSelf: "flex-start",
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    passwordContainer: {
        width: "100%",
        position: "relative",
    },
    eyeIcon: {
        position: "absolute",
        right: 15,
        top: 13,
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
    loginButton: {
        backgroundColor: "#3D5CFF",
        width: "100%",
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    loginText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
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
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#E0E0E0",
    },
    orText: {
        fontSize: 14,
        color: "#6F6F6F",
        marginHorizontal: 10,
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
