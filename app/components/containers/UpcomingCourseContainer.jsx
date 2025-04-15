import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const UpcomingCoursesContainer = ({ courses, selectedIndex, onScroll, onPressCourse }) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
        >
            {courses.map((course, index) => {
                const isActive = index === selectedIndex;
                const color = isActive ? "#3D5CFF" : "#aaa";

                return (
                    <TouchableOpacity
                        key={course.id || index}
                        style={[
                            styles.courseContainer,
                            isActive ? styles.activeCourse : styles.inactiveCourse,
                        ]}
                        activeOpacity={0.8}
                        onPress={() => onPressCourse(course)}
                    >
                        <MaterialCommunityIcons
                            name="notebook"
                            size={24}
                            color={color}
                            style={{ marginBottom: 5 }}
                        />
                        <Text style={[styles.title, { color }]}>{course.title}</Text>
                        <Text style={[styles.time, { color }]}>{course.time}</Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    courseContainer: {
        borderWidth: 1.5,
        borderRadius: 10,
        padding: 12,
        marginLeft: 20,
        marginBottom: 30,
        width: 210,
        height: 160,
        justifyContent: "center",
    },
    activeCourse: {
        borderColor: "#3D5CFF",
        backgroundColor: "#F6F9FF",
    },
    inactiveCourse: {
        borderColor: "#ccc",
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 14,
        fontWeight: "500",
        marginTop: 5,
    },
    time: {
        fontSize: 12,
        marginTop: 5,
    },
});

export default UpcomingCoursesContainer;
