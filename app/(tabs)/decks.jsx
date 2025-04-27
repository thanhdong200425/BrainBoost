import React from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DeckCard, SubmitButton } from "../../components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllDecks, deleteDeck } from "../../services/deckService";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function DecksScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['decks'],
    queryFn: getAllDecks
  });

  const deleteMutation = useMutation({
    mutationFn: (deckId) => deleteDeck(deckId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['decks'] });
      queryClient.invalidateQueries({ queryKey: ['homeData'] });
      
      Toast.show({
        type: 'success',
        text1: 'Deck deleted successfully!',
        position: 'top'
      });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Failed to delete deck',
        text2: error.message || 'Please try again later',
        position: 'top'
      });
    }
  });

  const handleDeckPress = (deckId) => {
    router.push({ pathname: '/deckdetail', params: { id: deckId } });
  };

  const handleDeckEdit = (deck) => {
    router.push({ 
      pathname: '/editdeck', 
      params: { 
        id: deck.id,
        deckData: JSON.stringify(deck)
      } 
    });
  };

  const handleCreateNewSet = () => router.push('/adddeck');
  
  const handleDeckDelete = (deckId) => {
    deleteMutation.mutate(deckId);
  };

  // Loading and error states
  if (isLoading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3D5CFF" />
    </View>
  );

  if (isError) return (
    <View style={styles.loadingContainer}>
      <Text style={styles.errorText}>Error loading decks: {error.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SubmitButton
        onPress={handleCreateNewSet} 
        text="Create New Set"
        style={styles.createButton}
        textStyle={styles.createButtonText}
        icon={<Text><Ionicons name="add-circle-outline" size={22} color="#fff" /></Text>}
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
            onEdit={() => handleDeckEdit(item)}
            onDelete={() => handleDeckDelete(item.id)}
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
    flex: 1,
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
    paddingBottom: 50,
  },
  loadingContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16
  }
});
