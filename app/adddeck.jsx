import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TextField, PairInput } from '../components'; 
import Toast from 'react-native-toast-message';

const AddDeckScreen = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [flashcards, setFlashcards] = useState([
        { id: 1, term: '', definition: '' },
        { id: 2, term: '', definition: '' },
        { id: 3, term: '', definition: '' },
    ]);

    const handleFlashcardChange = (id, field, value) => {
        setFlashcards(currentFlashcards =>
            currentFlashcards.map(card =>
                card.id === id ? { ...card, [field]: value } : card
            )
        );
    };

    const addFlashcardPair = () => {
        setFlashcards(currentFlashcards => [
            ...currentFlashcards,
            { id: Date.now(), term: '', definition: '' } // Use timestamp for unique ID
        ]);
        
        Toast.show({
            type: 'success',
            text1: 'Added new flashcard',
            position: 'bottom',
            visibilityTime: 1500
        });
    };

    const deleteFlashcardPair = (id) => {
        if (flashcards.length <= 1) {
            Toast.show({
                type: 'info',
                text1: 'At least one flashcard is required',
                position: 'bottom'
            });
            return;
        }
        
        setFlashcards(currentFlashcards => 
            currentFlashcards.filter(card => card.id !== id)
        );
        
        Toast.show({
            type: 'success',
            text1: 'Flashcard removed',
            position: 'bottom',
            visibilityTime: 1500
        });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add Deck</Text>
                <View style={{ width: 24 }} /> {/* Spacer */}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Title and Description */}
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={[styles.input, styles.descriptionInput]}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />
                </View>

                {/* Instructions for swipe gesture */}
                <Text style={styles.instructionText}>
                    <Ionicons name="information-circle-outline" size={16} color="#666" /> 
                    Swipe left on a flashcard to delete it
                </Text>

                {/* Flashcards using the new PairInput component */}
                {flashcards.map((card) => (
                    <PairInput
                        key={card.id}
                        id={card.id}
                        term={card.term}
                        definition={card.definition}
                        onChangeText={handleFlashcardChange}
                        onDelete={deleteFlashcardPair}
                    />
                ))}
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab} onPress={addFlashcardPair}>
                <Ionicons name="add" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FD', // Match background color if needed
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 40, // Adjust for status bar
        paddingBottom: 15,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 80, // Ensure space for FAB
    },
    inputGroup: {
        marginBottom: 15,
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#CCC',
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
    },
    descriptionInput: {
        height: 80, // Adjust height for description
        textAlignVertical: 'top', // Align text to top for multiline
    },
    instructionText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
        textAlign: 'center',
        fontStyle: 'italic'
    },
    fab: {
        position: 'absolute',
        right: 25,
        bottom: 25,
        backgroundColor: '#3D5CFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});

export default AddDeckScreen;
