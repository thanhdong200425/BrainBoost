import React from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DeckCard, SubmitButton } from "../../components"
import {useQuery} from "@tanstack/react-query";
import { getAllDecks } from "../../services/deckService";
import { useRouter } from "expo-router";

export default function DecksScreen() {
  const router = useRouter();

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['decks'],
    queryFn: getAllDecks
  })

  if (isLoading) return <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#3D5CFF" />
  </View>

  if (isError) return <View style={styles.loadingContainer}>
    <Text style={{color: "red"}}>Error loading decks: {error.message}</Text>
  </View>

  const handleDeckPress = (deckId) => {
    console.log(`Navigate to deck ${deckId}`);
  };

  return (
    <View style={styles.container}>
      <SubmitButton
        onPress={() => console.log("Create new set")}
        text="Create New Set"
        style={styles.createButton}
        textStyle={styles.createButtonText}
        icon={<Ionicons name="add-circle-outline" size={22} color="#fff" />}
      />

      <Text style={styles.header}>Your Decks</Text> 
      <FlatList
        data={data?.decks || []} 
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DeckCard
            name={item.name}
            description={item.description}
            visibility={item.visibility}
            updatedAt={item.updatedAt}
            onPress={() => handleDeckPress(item.id)}
          />
        )}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  createButton: {
    backgroundColor: "#3D5CFF",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20, 
    marginTop: 45,
    paddingHorizontal: 20,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  header: {
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 15,
    marginTop: 10, 
    color: '#1A1F36',
  },
  listContentContainer: { 
    paddingBottom: 30,
  },
  loadingContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
});
