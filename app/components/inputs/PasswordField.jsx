import React, { useState } from "react";
import { TextInput, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Kiểm tra tính hợp lệ mật khẩu (tối thiểu 8 ký tự, chứa chữ hoa, chữ thường, và số)
const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

const PasswordField = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (text) => {
        // Kiểm tra tính hợp lệ mật khẩu nếu có lỗi
        if (!validatePassword(text)) {
            setErrorMessage("Password must be at least 8 characters, including uppercase, lowercase, and numbers.");
        } else {
            setErrorMessage("");
        }

        onChangeText(text);  
    };

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={handleChange}
                    secureTextEntry={!isPasswordVisible && secureTextEntry} 
                />
                <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={styles.eyeIcon}
                >
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
