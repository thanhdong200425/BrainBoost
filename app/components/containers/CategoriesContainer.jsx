import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// List of categories of course
const CategoriesContainer = ({ categories }) => {
    return (
        <View style={styles.container}>
            {categories.map((category, index) => (
                <View key={index} style={styles.category}>
                    <Icon name={category.icon} size={24} color="blue" />
                    <Text style={styles.categoryText}>{category.name}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "space-around",
        paddingHorizontal: 20,
    },

    category: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        padding: 15,
        marginBottom: 10,
    },

    categoryText: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 20,
    },
});

export default CategoriesContainer;
