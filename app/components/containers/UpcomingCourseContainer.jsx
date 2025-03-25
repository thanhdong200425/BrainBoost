import React from "react";
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from "react-native";

// Courses not attended 
const UpcomingCoursesContainer = ({ courses }) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {courses.map((_, index) => (
                <View key={index} style={styles.courseContainer}>
                    <TouchableOpacity style={styles.getStartedButton}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    myCourses: {
        color: "blue",
        textAlign: "right",
        marginTop: 5,
    },

    courseContainer: {
        flex: 1,
        borderWidth: 1,
        backgroundColor: "white",
        borderRadius: 10,
        marginLeft: 20,
        marginBottom: 10,
        width: 270,
        height: 170,
    },

    getStartedButton: {
        position: "absolute",
        bottom: 10,
        left: 10,
        backgroundColor: "black",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default UpcomingCoursesContainer;
