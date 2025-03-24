import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

// Learning Plan - Progress of courses taken
const LearningPlanContainer = ({ courses }) => {
    return (
        <View style={styles.learningPlanContainer}>
            {courses.map((course, index) => (
                <View key={index} style={styles.courseItem}>
                    <Progress.Circle
                        size={30}
                        progress={course.progress / course.total}
                        color="blue"
                        unfilledColor="#e0e0e0"
                        borderWidth={0}
                    />
                    <View style={styles.courseInfo}>
                        <Text style={styles.courseName}>{course.name}</Text>
                        <Text style={styles.courseProgress}>{course.progress}/{course.total}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    learningPlanContainer: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: 20,
        padding: 20,
    },

    courseItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },

    courseInfo: {
        marginLeft: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },

    courseName: {
        fontSize: 16,
        fontWeight: "bold",
    },

    courseProgress: {
        fontSize: 14,
        color: "#888",
    },
});

export default LearningPlanContainer;
