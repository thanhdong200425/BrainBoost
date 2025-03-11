import React, { useEffect, useState } from "react";
import { TextInput, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

const PasswordField = ({ label, value, onChangeText, placeholder, onFocus, onBlur }) => { 
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (!isFocused && value && value.length > 0 && !validatePassword(value)) {
            setErrorMessage("Password must be at least 8 characters, including uppercase, lowercase, and numbers.");
        } else {
            setErrorMessage("");
        }
    }, [isFocused, value]);

    const handleFocus = () => {
        setIsFocused(true);
        if (onFocus) onFocus(); 
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (onBlur) onBlur(); 
    };

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={!isPasswordVisible}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                    <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} color="#A0A0A0" />
                </TouchableOpacity>
            </View>

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        marginBottom: 15,
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
    errorText: {
        fontSize: 12,
        color: "red",
        marginTop: 5,
    },
});

export default PasswordField;