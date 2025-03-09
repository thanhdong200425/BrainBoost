// app/components/ui/Button.jsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ onPress, text, style, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]} activeOpacity={0.8}>
            <Text style={[styles.buttonText, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3D5CFF", 
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default Button;
