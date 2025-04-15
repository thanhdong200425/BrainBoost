import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DeckCard from "../components/containers/DeckCard.jsx";
import SubmitButton from "../components/buttons/SubmitButton.jsx";

const dummyData = [
  {
    id: "1",
    title: "English Vocabulary - A1 Level",
    progress: 0.43,
    wordsLearned: 43,
    totalWords: 100,
  },
  {
    id: "2",
    title: "Business Vocabulary - B1 Level",
    progress: 0.65,
    wordsLearned: 65,
    totalWords: 100,
  },
  {
    id: "3",
    title: "Travel Vocabulary - A2 Level",
    progress: 0.30,
    wordsLearned: 30,
    totalWords: 100,
  },
];

export default function DecksScreen() {
  return (
    <View style={styles.container}>
      <SubmitButton
        onPress={() => console.log("Create new set")}
        text="Create New Set"
        style={styles.createButton}
        textStyle={styles.createButtonText}
        icon={<Ionicons name="add-circle-outline" size={22} color="#fff" />}
      />

      <Text style={styles.header}>List Decks</Text>
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DeckCard
            title={item.title}
            progress={item.progress}
            wordsLearned={item.wordsLearned}
            totalWords={item.totalWords}
            onContinuePress={() => console.log(`Continue deck ${item.id}`)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3D5CFF",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 30,
    marginTop: 70,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
});
