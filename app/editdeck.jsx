import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PairInput, SubmitButton } from '../components'; 
import Toast from 'react-native-toast-message';
import { updateDeck, createFlashcards, getDeckById, updateFlashcard } from '../services/deckService';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { 
    toggleVisibility, 
    validateDeckData
} from '../helpers/flashcardUtils';

const EditDeckScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const queryClient = useQueryClient();

    const [deckInfo, setDeckInfo] = useState({
        title: '',
        description: '',
        visibility: 'public',
        flashcards: [{ id: Date.now(), term: '', definition: '', isNew: true }],
    });
    
    // State to store original data for comparison
    const [originalDeckInfo, setOriginalDeckInfo] = useState(null);

    // Fetch deck details
    const { data: deckDetails, isLoading: isLoadingDeck } = useQuery({
        queryKey: ['deck', id],
        queryFn: () => getDeckById(id),
        enabled: !!id,
        onError: (error) => {
            console.error('Error fetching deck data:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not load deck data. Please try again.',
                position: 'top'
            });
        }
    });

    // Populate form with fetched deck data
    useEffect(() => {
        if (deckDetails) {
            const mappedFlashcards = deckDetails.flashcards?.length > 0 
                ? deckDetails.flashcards.map(card => ({
                    id: card.id,
                    term: card.frontText,
                    definition: card.backText,
                    isNew: false
                }))
                : [{ id: Date.now(), term: '', definition: '', isNew: true }];

            const newDeckInfo = {
                title: deckDetails.name || '',
                description: deckDetails.description || '',
                visibility: deckDetails.visibility || 'public',
                flashcards: mappedFlashcards,
            };
            
            setDeckInfo(newDeckInfo);
            
            // Store the original data for comparing changes
            setOriginalDeckInfo({
                ...newDeckInfo,
                flashcards: [...newDeckInfo.flashcards]
            });
        }
    }, [deckDetails]);

    // Function to check if data has changed
    const hasChanges = useCallback(() => {
        if (!originalDeckInfo) return false;
        
        if (
            deckInfo.title !== originalDeckInfo.title ||
            deckInfo.description !== originalDeckInfo.description ||
            deckInfo.visibility !== originalDeckInfo.visibility || deckInfo.flashcards.length !== originalDeckInfo.flashcards.length
        ) 
            return true;
        
        
        // Check for changes in existing flashcards
        const existingCards = deckInfo.flashcards.filter(card => !card.isNew);
        for (const card of existingCards) {
            const originalCard = originalDeckInfo.flashcards.find(
                origCard => origCard.id === card.id
            );
            
            if (
                !originalCard || 
                card.term !== originalCard.term || 
                card.definition !== originalCard.definition
            ) {
                return true;
            }
        }
        
        // Check if there are any new flashcards with content
        const newCardsWithContent = deckInfo.flashcards.filter(
            card => card.isNew && (card.term.trim() !== '' || card.definition.trim() !== '')
        );
        
        if (newCardsWithContent.length > 0) {
            return true;
        }
        
        return false;
    }, [deckInfo, originalDeckInfo]);

    // Update deck mutation
    const updateDeckMutation = useMutation({
        mutationFn: (deckData) => updateDeck(id, deckData),
        onSuccess: () => {
            processFlashcards();
        },
        onError: (error) => {
            console.error('Error updating deck:', error);
            
            // Handle permission error specifically
            if (error.message && error.message.includes('permission')) {
                Toast.show({
                    type: 'error',
                    text1: 'Permission Denied',
                    text2: 'You can only edit decks that you have created.',
                    position: 'top'
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to update deck',
                    text2: error.message || 'Please try again later',
                    position: 'top'
                });
            }
        }
    });

    // Update flashcard mutation
    const updateFlashcardMutation = useMutation({
        mutationFn: (flashcardData) => {
            return updateFlashcard(flashcardData.id, {
                term: flashcardData.term,
                definition: flashcardData.definition
            });
        },
        onSuccess: () => {
            // If this is the last operation, show success
            if (pendingOperations === 0) {
                showSuccessAndNavigate();
            }
        },
        onError: (error) => {
            console.error('Error updating flashcard:', error);
            
            // Handle permission error specifically
            if (error.message && error.message.includes('permission')) {
                Toast.show({
                    type: 'error',
                    text1: 'Permission Denied',
                    text2: 'You can only edit flashcards in decks that you own.',
                    position: 'top'
                });
            
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to update some flashcards',
                    text2: error.message || 'Please try again later',
                    position: 'top'
                });
            }
        }
    });

    // Create flashcards mutation
    const createFlashcardsMutation = useMutation({
        mutationFn: (data) => createFlashcards(id, data),
        onSuccess: () => {
            showSuccessAndNavigate();
        },
        onError: (error) => {
            console.error('Error creating flashcards:', error);
            Toast.show({
                type: 'error',
                text1: 'Failed to add new flashcards',
                text2: error.message || 'Please try again later',
                position: 'top'
            });
        }
    });

    // Track pending operations
    let pendingOperations = 0;

    const processFlashcards = () => {
        const validFlashcards = deckInfo.flashcards.filter(card => 
            card.term.trim() !== '' && card.definition.trim() !== ''
        );
        
        const existingCards = validFlashcards.filter(card => !card.isNew);
        const newCards = validFlashcards.filter(card => card.isNew);
        
        // Process existing cards with individual mutations
        if (existingCards.length > 0) {
            pendingOperations = existingCards.length;
            existingCards.forEach(card => {
                updateFlashcardMutation.mutate(card, {
                    onSuccess: () => {
                        pendingOperations--;
                        if (pendingOperations === 0 && newCards.length === 0) {
                            showSuccessAndNavigate();
                        }
                    }
                });
            });
        }
        
        // Process new cards with a single mutation
        if (newCards.length > 0) {
            createFlashcardsMutation.mutate(newCards);
        }
        
        // If no cards to process, show success
        if (existingCards.length === 0 && newCards.length === 0) {
            showSuccessAndNavigate();
        }
    };

    const showSuccessAndNavigate = () => {
        Toast.show({
            type: 'success',
            text1: 'Deck updated successfully!',
            position: 'top'
        });
        
        // Invalidate queries to refresh data
        queryClient.invalidateQueries({ queryKey: ['decks'] });
        queryClient.invalidateQueries({ queryKey: ['homeData'] });
        queryClient.invalidateQueries({ queryKey: ['deck', id] });
        
        router.push('/decks');
    };

    const handleSubmit = () => {
        if (!validateDeckData(deckInfo)) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter a valid title and description.',
                position: 'top'
            });
            return;
        }

        // Start by updating the deck
        updateDeckMutation.mutate({
            name: deckInfo.title,
            description: deckInfo.description,
            visibility: deckInfo.visibility
        });
    };

    // Simple flashcard handlers
    const handleFlashcardChange = (id, field, value) => {
        setDeckInfo(prev => ({
            ...prev,
            flashcards: prev.flashcards.map(card => 
                card.id === id 
                    ? { ...card, [field]: value }
                    : card
            )
        }));
    };

    const addFlashcardPair = () => {
        setDeckInfo(prev => ({
            ...prev,
            flashcards: [
                ...prev.flashcards,
                { id: Date.now(), term: '', definition: '', isNew: true }
            ]
        }));
    };

    const deleteFlashcardPair = (id) => {
        setDeckInfo(prev => ({
            ...prev,
            flashcards: prev.flashcards.filter(card => card.id !== id)
        }));
    };

    const isSubmitting = 
        updateDeckMutation.isPending || 
        updateFlashcardMutation.isPending || 
        createFlashcardsMutation.isPending;
    
    const isButtonDisabled = isSubmitting || !hasChanges();

    if (isLoadingDeck) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3D5CFF" />
                <Text style={styles.loadingText}>Loading deck information...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.iconContainer}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Deck</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Title and Description */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter deck title"
                        value={deckInfo.title}
                        onChangeText={(text) => setDeckInfo(prev => ({ ...prev, title: text }))}
                    />
                </View>
                
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.descriptionInput]}
                        placeholder="Enter deck description"
                        value={deckInfo.description}
                        onChangeText={(text) => setDeckInfo(prev => ({ ...prev, description: text }))}
                        multiline
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Visibility</Text>
                    <TouchableOpacity 
                        style={[
                            styles.visibilitySelector,
                            deckInfo.visibility === 'private' ? styles.privateSelector : styles.publicSelector
                        ]}
                        onPress={() => toggleVisibility(setDeckInfo)}
                    >
                        <Text style={styles.iconContainer}>
                            <Ionicons 
                                name={deckInfo.visibility === 'private' ? "lock-closed" : "earth"} 
                                size={20} 
                                color={deckInfo.visibility === 'private' ? "#FF6B6B" : "#3D5CFF"} 
                            />
                        </Text>
                        <Text style={[
                            styles.visibilityText,
                            deckInfo.visibility === 'private' ? styles.privateText : styles.publicText
                        ]}>
                            {deckInfo.visibility === 'private' ? 'Private' : 'Public'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Instructions for swipe gesture */}
                <Text style={styles.sectionTitle}>Flashcards</Text>
                
                <View style={styles.instructionText}>
                    <Text style={styles.iconContainer}>
                        <Ionicons name="information-circle-outline" size={16} color="#666" />
                    </Text> 
                    <Text style={styles.instructionTextContent}>Swipe left on a flashcard to delete it</Text>
                </View>

                {/* Flashcards using the PairInput component */}
                {deckInfo.flashcards.map((card) => (
                    <PairInput
                        key={card.id}
                        id={card.id}
                        term={card.term}
                        definition={card.definition}
                        onChangeText={handleFlashcardChange}
                        onDelete={deleteFlashcardPair}
                    />
                ))}
                
                {/* Submit Button */}
                <SubmitButton
                    text={isSubmitting ? "Updating..." : "Update Deck"}
                    onPress={handleSubmit}
                    style={[
                        styles.submitButton,
                        !hasChanges() && styles.disabledButton
                    ]}
                    disabled={isButtonDisabled}
                    icon={isSubmitting && 
                        <ActivityIndicator size="small" color="#fff" /> 
                    }
                />
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab} onPress={addFlashcardPair}>
                <Text style={styles.iconContainer}>
                    <Ionicons name="add" size={30} color="#fff" />
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FD',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 40,
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
        paddingBottom: 80, 
    },
    inputGroup: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E5FF',
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
    },
    descriptionInput: {
        height: 100, 
        textAlignVertical: 'top', 
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginTop: 10,
        marginBottom: 12,
    },
    instructionText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
        textAlign: 'center',
        fontStyle: 'italic',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    instructionTextContent: {
        marginLeft: 10,
    },
    visibilitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
    },
    publicSelector: {
        backgroundColor: '#EBF3FF',
        borderColor: '#3D5CFF',
    },
    privateSelector: {
        backgroundColor: '#FFEBEB',
        borderColor: '#FF6B6B',
    },
    visibilityText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
    },
    publicText: {
        color: '#3D5CFF',
    },
    privateText: {
        color: '#FF6B6B',
    },
    submitButton: {
        backgroundColor: '#3D5CFF',
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 25,
        marginBottom: 20,
    },
    disabledButton: {
        backgroundColor: '#A0A0A0',
        opacity: 0.7,
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FD',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default EditDeckScreen;
