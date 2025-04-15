import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FlashcardFlipCarousel from "../app/components/containers/FlashcardFlipCarousel";

// Giống như trong deckdetail
const deck = {
  title: "A1 Cambridge",
  description: "Let try your best to learn A1 vocabulary",
};

const flashcards = [
  { term: "Apple", definition: "Quả táo" },
  { term: "Vocabulary", definition: "Từ vựng" },
];

const FlashcardScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{deck.title}</Text>

      {/* Flashcard Component */}
      <FlashcardFlipCarousel
        data={flashcards}
        showIcon={false}
        cardWidth={400}
        cardHeight={600}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default FlashcardScreen;
