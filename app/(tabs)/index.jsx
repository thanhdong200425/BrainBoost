import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import * as Progress from "react-native-progress";
import CategoriesContainer from "../components/containers/CategoriesContainer.jsx"
import UpcomingCoursesContainer from "../components/containers/UpcomingCourseContainer.jsx"
import LearningPlanContainer from "../components/containers/LearningPlanContainer.jsx"
import ClassesContainer from "../components/containers/ClassesContainer.jsx"

export default function HomeScreen() {

    const userData = {
        name: "Lam",
        avatar: "",
        progress: 46,
        totalProgress: 60,
        upcomingCourses: [{}, {}, {}, {}],
        learningPlan: [
            { name: "Packaging Design", progress: 40, total: 48 },
            { name: "Product Design", progress: 6, total: 24 },
        ],
        classes: [
            { name: "Class1", image: "https://example.com/math.jpg" },
            { name: "Class2", image: "https://example.com/science.jpg" },
            { name: "Class3", image: "https://example.com/history.jpg" },
        ],
    };

    const categoriesData = [
        { name: "Animal", icon: "paw" },
        { name: "Sport", icon: "futbol-o" },
        { name: "Job", icon: "briefcase" },
    ];

    return (
        <ScrollView style={styles.container}>

            {/* HEADER SIDE */}
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Hi, {userData.name}</Text>
                        <Text style={styles.subtext}>Let's start learning</Text>
                    </View>
                    <Image source={{ uri: userData.avatar }} style={styles.avatar} />
                </View>
            </View>


            {/* Progress section of minutes learned in a day */}
            <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                    <Text style={styles.progressText}>Learned today</Text>
                    <Text style={styles.myCourses}>My courses</Text>
                </View>

                <Text style={styles.progressValue}>
                    <Text style={styles.progressCurrent}>{userData.progress} min </Text>/{userData.totalProgress} min
                </Text>

                {/* Progress bar */}
                <Progress.Bar
                    progress={userData.progress / userData.totalProgress}
                    width={null}
                    height={10}
                    borderRadius={5}
                    color="blue"
                    unfilledColor="#e0e0e0"
                    borderWidth={1}
                    style={styles.progressBar}
                />
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <UpcomingCoursesContainer courses={userData.upcomingCourses} />
            </ScrollView>

            <Text style={styles.sectionTitle}>Learning Plan</Text>
            <LearningPlanContainer courses={userData.learningPlan} />

            <ClassesContainer classes={userData.classes} />

            <Text style={styles.sectionTitle}>Start With</Text>
            <CategoriesContainer categories={categoriesData} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    headerContainer: {
        padding: 25,
        backgroundColor: "blue",
        height: 170,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    greeting: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },

    subtext: {
        fontSize: 16,
        color: "white",
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    progressContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        margin: 20,
        marginTop: -60,
        borderWidth: 1,
    },

    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },

    progressText: {
        fontSize: 16,
    },

    progressValue: {
        fontSize: 18,
    },

    progressCurrent: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },

    progressBar: {
        marginTop: 8,
        height: 10,
        borderRadius: 5,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});
