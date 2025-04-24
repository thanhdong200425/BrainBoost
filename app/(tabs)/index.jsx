import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { PieChart } from "react-native-chart-kit";
import { SubmitButton, PieLegend, ContentCarousel } from "../../components";
import HomeHeader from "../../components/headers/HomeHeader";
import { useQuery } from "@tanstack/react-query";
import { getHomeData } from "../../services/homeService";
import { ITEM_WIDTH } from "../../constants/sizes";

export default function HomeScreen() {
    const router = useRouter();
    const [selectedDeckIndex, setSelectedDeckIndex] = useState(0);
    const [selectedClassIndex, setSelectedClassIndex] = useState(0);
    const [selectedFolderIndex, setSelectedFolderIndex] = useState(0);

    const { data: homeData, isLoading, isError, error } = useQuery({
        queryKey: ['homeData'],
        queryFn: getHomeData
    });

    const navigateToDeckDetail = useCallback((deck) => {
        router.push({
            pathname: "/deckdetail",
            params: { id: deck.id }
        });
    }, [router]);

    const navigateToClassDetail = useCallback((item) => {
        router.push("/classdetail"); 
    }, [router]);

    const navigateToFolderDetail = useCallback((item) => {
        router.push("/folderdetail"); 
    }, [router]);

    if (isLoading) return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );

    if (isError) return (
        <View style={styles.loadingContainer}>
            <Text>Error: {error.message}</Text>
            <Text>Try to refresh the page</Text>
        </View>
    );

    const userData = {
        name: "Dong",
        progress: [
            { name: "Good", percentage: 70, color: "#A5D8FF", legendFontColor: "#7F7F7F", legendFontSize: 12 },
            { name: "Need to learn more", percentage: 30, color: "#FDAF75", legendFontColor: "#7F7F7F", legendFontSize: 12 },
        ],
    };

    const handleScroll = (event, setIndex) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / ITEM_WIDTH);
        setIndex(index);
    };

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <HomeHeader 
                userData={userData}
                stats={{
                    decks: homeData.decks.length,
                    classes: homeData.classes.length,
                    folders: homeData.folders.length
                }}
            />

            <View style={styles.content}>
                <SubmitButton
                    text="✨ Generate New Flashcards with AI ✨"
                    onPress={() => console.log("AI Flashcard button pressed")}
                    style={styles.buttonShadow}
                    textStyle={{ fontSize: 15 }}
                />

                <Text style={styles.sectionTitle}>Your Decks</Text>
                <ContentCarousel
                    items={homeData.decks}
                    type="deck"
                    selectedIndex={selectedDeckIndex}
                    onScroll={(event) => handleScroll(event, setSelectedDeckIndex)}
                    onPressItem={navigateToDeckDetail}
                />

                <Text style={styles.sectionTitle}>Your Classes</Text>
                <ContentCarousel
                    items={homeData.classes}
                    type="class"
                    selectedIndex={selectedClassIndex}
                    onScroll={(event) => handleScroll(event, setSelectedClassIndex)}
                    onPressItem={navigateToClassDetail}
                />

                <Text style={styles.sectionTitle}>Your Folders</Text>
                <ContentCarousel
                    items={homeData.folders}
                    type="folder"
                    selectedIndex={selectedFolderIndex}
                    onScroll={(event) => handleScroll(event, setSelectedFolderIndex)}
                    onPressItem={navigateToFolderDetail}
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
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    },
    content: {
        paddingTop: 20,
    },
    buttonShadow: {
        marginBottom: 25,
        backgroundColor: "#3D5CFF",
        borderRadius: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1A1F36",
        marginTop: 10,
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    chartContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 130,
        paddingHorizontal: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
