import React from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FlashcardFlipCarousel, FlashcardPreviewItem, DeckNavItem } from "../components";

const flashcards = [
    { term: "Apple", definition: "Quả táo" },
    { term: "Vocabulary", definition: "Từ vựng" },
];

const deck = {
    title: "A1 Cambridge",
    description: "Let try your best to learn A1 vocabulary",
};

const DeckDetailScreen = () => {
    const router = useRouter();

    const handleZoom = (item) => {
        router.push({
            pathname: "/flashcard",
            params: {
                term: item.term,
                def: item.definition,
            },
        });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>{deck.title}</Text>

            {/* Flashcard Carousel */}
            <FlashcardFlipCarousel data={flashcards} showIcon onIconPress={handleZoom} />

            {/* Navigation Buttons */}
            <View style={styles.navContainer}>
                <DeckNavItem icon={require("../assets/images/flashcard.png")} label="Flashcard" onPress={() => router.push("/flashcard")} />
                <DeckNavItem icon={require("../assets/images/learn.png")} label="Learn" onPress={() => console.log("Navigate to Learn")} style={{ width: 54, height: 54 }} />
                <DeckNavItem icon={require("../assets/images/test.png")} label="Test" onPress={() => console.log("Navigate to Test")} />
            </View>

            {/* Description Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>"{deck.description}"</Text>
            </View>

            {/* Flashcard Preview Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Preview flashcard</Text>
                {flashcards.map((item, index) => (
                    <FlashcardPreviewItem key={index} term={item.term} definition={item.definition} />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    backButton: {
        marginBottom: 10,
        marginTop: 30,
        alignSelf: "flex-start",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
    },
    navContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20,
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontWeight: "600",
        fontSize: 16,
        marginBottom: 5,
    },
    description: {
        fontStyle: "italic",
    },
});

export default DeckDetailScreen;
