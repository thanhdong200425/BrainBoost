import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const UpcomingCoursesContainer = ({ courses }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const itemWidth = 270 + 20; // card width + marginLeft
    const index = Math.round(offsetX / itemWidth);
    setSelectedIndex(index);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {courses.map((course, index) => {
        const isActive = index === selectedIndex;
        const color = isActive ? "#3D5CFF" : "#aaa";

        return (
          <View
            key={course.id || index}
            style={[
              styles.courseContainer,
              isActive ? styles.activeCourse : styles.inactiveCourse,
            ]}
          >
            <MaterialCommunityIcons
              name="notebook"
              size={24}
              color={color}
              style={{ marginBottom: 5 }}
            />
            <Text style={[styles.title, { color }]}>{course.title}</Text>
            <Text style={[styles.time, { color }]}>{course.time}</Text>
          </View>
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
    marginBottom:30,
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
    marginTop: 5
  },
  time: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default UpcomingCoursesContainer;
