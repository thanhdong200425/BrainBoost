import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import SubmitButton from "../components/buttons/SubmitButton.jsx";
import UpcomingCoursesContainer from "../components/containers/UpcomingCourseContainer.jsx";
import PieLegend from "../components/containers/PieLegend.jsx";
import { PieChart } from "react-native-chart-kit";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

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
            <UpcomingCoursesContainer
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
    );
}

const styles = StyleSheet.create({
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
