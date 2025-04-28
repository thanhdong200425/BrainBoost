import { useRouter } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../services/authService";
import { setCredentials } from "../redux/slices/authSlice";
import { TextField, PasswordField, DividerWithText, ThirdPartyContainer, ThirdPartyButton, SubmitButton, OtherOption, Logo } from "../components";
import Toast from 'react-native-toast-message';

// import { GoogleSignin, isSuccessResponse, isErrorWithCode, statusCodes } from "@react-native-google-signin/google-signin"
// import { navigate } from "expo-router/build/global-state/routing";

export default function LoginScreen() {

    // Login by Google:
    // useEffect(() => {
    //     GoogleSignin.configure({
    //         iosClientId:
    //             "182681219412-116tvru8m1porgoefqj0vs4be6k2fvbq.apps.googleusercontent.com",
    //         webClientId:
    //             "182681219412-9qc0eqmo49o5dq9t5knr7qgesbs7b2f1.apps.googleusercontent.com",
    //         profileImageSize: 150,
    //     })
    // })

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
            Toast.show({
                type: 'success',
                text1: 'Login successful',
                text2: 'Welcome back to BrainBoost!',
                position: 'top'
            });
            router.push("/(tabs)")
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Login error',
                text2: error.message || "An unexpected error occurred. Please try again.",
                position: 'top'
            });
        }
    })

    const handleLogin = () => {
        if (!email || !password) {
            Toast.show({
                type: 'info',
                text1: 'Missing information',
                text2: 'Please enter your email and password.',
                position: 'top'
            });
            return;
        }

        mutation.mutate({ email, password })
    };

    const navigateToSignUp = () => router.push("/signup");

    // const [isSubmitting, setIsSubmitting] = useState(false)
    // const handleGoogleSignIn = async () => {
    //     try {
    //         setIsSubmitting(true)
    //         await GoogleSignin.hasPlayServices()
    //         const response = await GoogleSignin.signIn()
    //         if (isSuccessResponse(response)) {
    //             const { isToken, user } = response.data
    //             const { name, email, photo } = user
    //             Toast.show({
    //                 type: 'success',
    //                 text1: 'Login Successful',
    //                 text2: `Welcome, ${name}!`,
    //                 position: 'top'
    //             });
    //             router.push("/");
    //         } else {
    //             showMessage("Google Signin was cancelled")
    //         }
    //         setIsSubmitting(false)
    //     } catch (error) {
    //         if (isErrorWithCode(error)) {
    //             switch (error.code) {
    //                 case statusCodes.IN_PROGRESS:
    //                     showMessage("Google Signin is in progress")
    //                     break;
    //                 case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
    //                     showMessage("Play services are not available")
    //                     break;
    //                 default:
    //                     showMessage(error.code)
    //             }
    //         } else {
    //             showMessage("An error occured")
    //         }
    //         setIsSubmitting(false)
    //     }
    // }

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
