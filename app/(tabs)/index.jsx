// <<<<<<< HEAD
// import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
// import * as Progress from "react-native-progress";
// import CategoriesContainer from "../components/containers/CategoriesContainer.jsx"
// import UpcomingCoursesContainer from "../components/containers/UpcomingCourseContainer.jsx"
// import LearningPlanContainer from "../components/containers/LearningPlanContainer.jsx"
// import ClassesContainer from "../components/containers/ClassesContainer.jsx"
// =======
import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useRouter } from "expo-router";
import { PieChart } from "react-native-chart-kit";
import { SubmitButton, UpcomingCourseContainer, PieLegend } from "../../components";

const screenWidth = Dimensions.get("window").width;
// >>>>>>> 2379b9168133851dcbb0d4fe32bfd18e667668dd

export default function HomeScreen() {
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const userData = {
        name: "Dong",
        recentlyStudied: [
            { id: 1, title: "Vocabulary A1 – A2 (ETS 2023)", time: "2 Days ago" },
            { id: 2, title: "Vocabulary B1 (ETS 2023)", time: "2 Days ago" },
            { id: 3, title: "Vocabulary B2 (ETS 2023)", time: "2 Days ago" },
            { id: 4, title: "Vocabulary C1 (ETS 2023)", time: "2 Days ago" },
        ],
        progress: [
            { name: "Good", percentage: 70, color: "#A5D8FF", legendFontColor: "#7F7F7F", legendFontSize: 12 },
            { name: "Need to learn more", percentage: 30, color: "#FDAF75", legendFontColor: "#7F7F7F", legendFontSize: 12 },
        ],
    };

    const navigateToDeckDetail = useCallback((course) => {
        router.push("/deckdetail");
    }, [router]);

    const handleScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const itemWidth = 270 + 20; // card width + marginLeft
        const index = Math.round(offsetX / itemWidth);
        setSelectedIndex(index);
    };

    return (
        // <<<<<<< HEAD
        //         <SafeAreaView style={styles.safeArea}>
        //             <ScrollView style={styles.container}>

        //                 {/* HEADER SIDE */}
        //                 <View style={styles.headerContainer}>
        //                     <View style={styles.header}>
        //                         <View>
        //                             <Text style={styles.greeting}>Hi, {userData.name}</Text>
        //                             <Text style={styles.subtext}>Let's start learning</Text>
        //                         </View>
        //                         <Image source={{ uri: userData.avatar }} style={styles.avatar} />
        //                     </View>
        //                 </View>


        //                 {/* Progress section of minutes learned in a day */}
        //                 <View style={styles.progressContainer}>
        //                     <View style={styles.progressHeader}>
        //                         <Text style={styles.progressText}>Learned today</Text>
        //                         <Text style={styles.myCourses}>My courses</Text>
        //                     </View>

        //                     <Text style={styles.progressValue}>
        //                         <Text style={styles.progressCurrent}>{userData.progress} min </Text>/{userData.totalProgress} min
        //                     </Text>

        //                     {/* Progress bar */}
        //                     <Progress.Bar
        //                         progress={userData.progress / userData.totalProgress}
        //                         width={null}
        //                         height={10}
        //                         borderRadius={5}
        //                         color="blue"
        //                         unfilledColor="#e0e0e0"
        //                         borderWidth={1}
        //                         style={styles.progressBar}
        //                     />
        //                 </View>

        //                 <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        //                     <UpcomingCoursesContainer courses={userData.upcomingCourses} />
        //                 </ScrollView>

        //                 <Text style={styles.sectionTitle}>Learning Plan</Text>
        //                 <LearningPlanContainer courses={userData.learningPlan} />

        //                 <ClassesContainer classes={userData.classes} />

        //                 <Text style={styles.sectionTitle}>Start With</Text>
        //                 <CategoriesContainer categories={categoriesData} />
        //             </ScrollView>
        //         </SafeAreaView>
        // =======
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.greeting}>Hi, {userData.name}</Text>
            <Text style={styles.subGreeting}>Ready to boost your vocabulary?</Text>

            <SubmitButton
                text="✨ Generate New Flashcards with AI ✨"
                onPress={() => console.log("AI Flashcard button pressed")}
                style={styles.buttonShadow}
                textStyle={{ fontSize: 15 }}
            />

            <Text style={styles.sectionTitle}>Recently Studied</Text>
            <UpcomingCourseContainer
                courses={userData.recentlyStudied}
                selectedIndex={selectedIndex}
                onScroll={handleScroll}
                onPressCourse={navigateToDeckDetail}
            />

            <Text style={styles.sectionTitle}>Your Progress Chart</Text>
            <View style={styles.chartContainer}>
                <PieChart
                    data={userData.progress.map((item) => ({
                        name: item.name,
                        population: item.percentage,
                        color: item.color,
                        legendFontColor: item.legendFontColor,
                        legendFontSize: item.legendFontSize,
                    }))}
                    width={170}
                    height={170}
                    chartConfig={{
                        backgroundGradientFrom: "#fff",
                        backgroundGradientTo: "#fff",
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        decimalPlaces: 0,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="50"
                    absolute
                    style={{ alignSelf: "center" }}
                    hasLegend={false}
                />
                <PieLegend data={userData.progress} />
            </View>
        </ScrollView>
        // >>>>>>> 2379b9168133851dcbb0d4fe32bfd18e667668dd
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "blue",
    },

    container: {
        padding: 20,
        backgroundColor: "#fff",
    },
    greeting: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 50,
    },
    subGreeting: {
        marginTop: 7,
        fontSize: 14,
        color: "#555",
    },
    buttonShadow: {
        marginTop: 30,
        marginBottom: 25,
        shadowColor: "#3D5CFF",
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 20,
    },
    chartContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 130,
    },
});
