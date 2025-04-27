import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, StatusBar, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FlashcardFlipCarousel, FlashcardPreviewItem, DeckNavItem } from "../components";
import { getDeckById } from "../services/deckService";
import { useQuery } from "@tanstack/react-query";


const DeckDetailScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    
    const { data: deck, isLoading, isError, error } = useQuery({
        queryKey: ['deck', id],
        queryFn: () => getDeckById(id),
        enabled: !!id
    });

    const handleZoom = (item) => {
        router.push({
            pathname: "/flashcard",
            params: {
                flashcards: JSON.stringify([item]),
                deckName: deck.name
            },
        });
    };

    const navigateToFlashcards = () => {
        router.push({
            pathname: "/flashcard",
            params: { 
                flashcards: JSON.stringify(deck.flashcards), 
                deckName: deck.name 
            },
        });
    };

    const navigateToLearn = () => {
        router.push({
            pathname: "/learn", 
            params: { 
                flashcards: JSON.stringify(deck.flashcards), 
                deckName: deck.name,
                deckId: id,
                data: JSON.stringify()
            },
        });
    };

    if (isLoading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#3D5CFF" />
            </View>
        );
    }

    if (isError) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>Error loading deck: {error.message}</Text>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => router.back()}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            
            {/* Header with Back Button and Title */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>{deck.name}</Text>
                <View style={{width: 24}} />
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Flashcard Carousel */}
                <View style={styles.carouselContainer}>
                    <FlashcardFlipCarousel data={deck.flashcards} showIcon onIconPress={handleZoom} />
                </View>

                {/* Navigation Buttons */}
                <View style={styles.navContainer}>
                    <TouchableOpacity 
                        style={styles.navButton}
                        onPress={navigateToFlashcards} // Updated onPress handler
                    >
                        <View style={styles.iconBackground}>
                            <Image
                                source={require("../assets/images/flashcard.png")}
                                style={styles.navIcon}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.navLabel}>Flashcard</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.navButton}
                        onPress={navigateToLearn} 
                    >
                        <View style={[styles.iconBackground, styles.learnBackground]}>
                            <Image
                                source={require("../assets/images/learn.png")}
                                style={styles.navIcon}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.navLabel}>Learn</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.navButton}
                        onPress={() => console.log("Navigate to Test")} 
                    >
                        <View style={[styles.iconBackground, styles.testBackground]}>
                            <Image
                                source={require("../assets/images/test.png")}
                                style={styles.navIcon}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.navLabel}>Test</Text>
                    </TouchableOpacity>
                </View>

                {/* Info Sections */}
                <View style={styles.infoContainer}>
                    {/* Description Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="information-circle-outline" size={18} color="#3D5CFF" />
                            <Text style={styles.sectionTitle}>Description</Text>
                        </View>
                        <View style={styles.descriptionBox}>
                            <Text style={styles.description}>
                                {deck.description || 'No description available'}
                            </Text>
                        </View>
                    </View>

                    {/* Visibility Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Ionicons 
                                name={deck.visibility === 'private' ? "lock-closed-outline" : "globe-outline"} 
                                size={18} 
                                color="#3D5CFF" 
                            />
                            <Text style={styles.sectionTitle}>Visibility</Text>
                        </View>
                        <View style={[
                            styles.visibilityContainer,
                            deck.visibility === 'private' ? styles.privateContainer : styles.publicContainer
                        ]}>
                            <Ionicons 
                                name={deck.visibility === 'private' ? "lock-closed" : "earth"} 
                                size={16} 
                                color={deck.visibility === 'private' ? "#FF6B6B" : "#3D5CFF"} 
                                style={styles.visibilityIcon}
                            />
                            <Text style={[
                                styles.visibilityText,
                                deck.visibility === 'private' ? styles.privateText : styles.publicText
                            ]}>
                                {deck.visibility === 'private' ? 'Private' : 'Public'}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Flashcard Preview Section */}
                <View style={styles.previewContainer}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="card-outline" size={18} color="#3D5CFF" />
                        <Text style={styles.sectionTitle}>Preview flashcards</Text>
                    </View>
                    
                    {deck.flashcards.map((item, index) => (
                        <View key={index} style={styles.flashcardPreview}>
                            <View style={styles.flashcardTerm}>
                                <View style={styles.termHeader}>
                                    <Text style={styles.previewLabel}>Term</Text>
                                    <View style={styles.termIndicator} />
                                </View>
                                <Text style={styles.previewTermText}>{item.frontText}</Text>
                            </View>
                            <View style={styles.flashcardDefinition}>
                                <View style={styles.definitionHeader}>
                                    <Text style={styles.previewLabel}>Definition</Text>
                                    <View style={styles.definitionIndicator} />
                                </View>
                                <Text style={styles.previewDefinitionText}>{item.backText}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
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
        paddingTop: 30,
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
    scrollContent: {
        paddingBottom: 40,
    },
    centerContent: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#333",
        flex: 1,
        textAlign: 'center',
    },
    carouselContainer: {
        marginTop: 20,
        paddingHorizontal: 15,
    },
    navContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: '#FFFFFF',
        paddingVertical: 24,
        borderRadius: 24,
        marginHorizontal: 20,
        marginTop: 24,
        marginBottom: 20,
        shadowColor: "rgba(61, 92, 255, 0.1)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 3,
    },
    navButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
    },
    iconBackground: {
        width: 72,
        height: 72,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8EFFF',
        marginBottom: 8,
    },
    learnBackground: {
        backgroundColor: '#E6FFF0',
    },
    testBackground: {
        backgroundColor: '#FFE6E6',
    },
    navIcon: {
        width: 32,
        height: 32,
    },
    navLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
        marginTop: 4,
    },
    infoContainer: {
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 22,
        marginTop: 20,
        shadowColor: "#3D5CFF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    section: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontWeight: "700",
        fontSize: 16,
        marginLeft: 8,
        color: "#333",
    },
    descriptionBox: {
        backgroundColor: '#F0F5FF',
        borderRadius: 16,
        padding: 18,
        borderLeftWidth: 4,
        borderLeftColor: '#3D5CFF',
    },
    description: {
        color: "#444",
        lineHeight: 22,
        fontSize: 15,
    },
    visibilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        padding: 14,
    },
    publicContainer: {
        backgroundColor: '#EBF3FF',
    },
    privateContainer: {
        backgroundColor: '#FFEBEB',
    },
    visibilityIcon: {
        marginRight: 8,
    },
    visibilityText: {
        fontSize: 15,
        fontWeight: '600',
    },
    privateText: {
        color: "#FF6B6B",
    },
    publicText: {
        color: "#3D5CFF",
    },
    previewContainer: {
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 22,
        marginTop: 20,
        shadowColor: "#3D5CFF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        marginBottom: 30,
    },
    flashcardPreview: {
        marginBottom: 20,
        backgroundColor: '#FFF',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E8EEFF',
        shadowColor: "#3D5CFF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    flashcardTerm: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E8EEFF',
    },
    flashcardDefinition: {
        padding: 16,
        backgroundColor: '#F8FAFF',
    },
    termHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    definitionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    termIndicator: {
        width: 24,
        height: 6,
        backgroundColor: '#3D5CFF',
        borderRadius: 3,
    },
    definitionIndicator: {
        width: 24,
        height: 6,
        backgroundColor: '#7B93FF',
        borderRadius: 3,
    },
    previewLabel: {
        fontSize: 12,
        color: '#888',
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    previewTermText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#333',
    },
    previewDefinitionText: {
        fontSize: 17,
        color: '#444',
    },
    errorText: {
        color: "#FF6B6B",
        marginBottom: 20,
        textAlign: "center",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#3D5CFF",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "600",
        fontSize: 16,
    },
});

export default DeckDetailScreen;
