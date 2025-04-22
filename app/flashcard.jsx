import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FlashcardFlipCarousel } from "../components";

const FlashcardScreen = () => {
  const router = useRouter();
  const { flashcards: flashcardsString, deckName } = useLocalSearchParams();

  let flashcards = [];
  try {
    flashcards = JSON.parse(flashcardsString || '[]');
  } catch (e) {
    console.error("Failed to parse flashcards data:", e);
  }

  return (
    <View style={styles.container}>
      {/* Header with Back Button and Title */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{deckName || 'Flashcards'}</Text>
        <View style={{width: 24}} />
      </View>

      {/* Flashcard Component */}
      {flashcards.length > 0 ? (
        <View style={styles.carouselContainer}>
          <FlashcardFlipCarousel
            data={flashcards}
            showIcon={false}
            cardWidth={400}
            cardHeight={600}
          />
        </View>
      ) : (
        <Text style={styles.noCardsText}>No flashcards available for this deck.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FD",
  },
  header: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
  },
  backButton: {
  },
  title: { 
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    flex: 1,
    textAlign: 'center',
  },
  carouselContainer: { 
    flex: 1, 
    paddingTop: 20, 
    alignItems: 'center', 
  },
  noCardsText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  }
});

export default FlashcardScreen;
