import React, { useState, useCallback, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Alert,
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import BottomModal from '../../components/containers/BottomModal'
import SwipeableDeckCard from '../../components/containers/SwipeableDeckCard'
import MembersList from '../../components/containers/MembersList'
import {
    getClassById,
    updateClass,
    getClassDecks,
    addDeckToClass,
    removeDeckFromClass,
    createClass,
} from '../../services/classService'
import { getFlashcardsById } from '../../services/deckService'

const ClassDetailScreen = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const {
        classId,
        classTitle: initialClassTitle = 'Name Class',
        selectedDecks,
    } = useLocalSearchParams()

    const [classTitle, setClassTitle] = useState(initialClassTitle)
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [activeTab, setActiveTab] = useState('Modules')
    const [isMoreVisible, setIsMoreVisible] = useState(false)
    const [isNewClass, setIsNewClass] = useState(classId === 'new')

    const {
        data: classData,
        isLoading: isLoadingClass,
        error: classError,
    } = useQuery({
        queryKey: ['class', classId],
        queryFn: () => getClassById(classId),
        enabled: !!classId && classId !== 'new',
    })

    const {
        data: decks = [],
        isLoading: isLoadingDecks,
        error: decksError,
    } = useQuery({
        queryKey: ['classDecks', classId],
        queryFn: () => getClassDecks(classId),
        enabled: !!classId && classId !== 'new',
    })

    const updateClassMutation = useMutation({
        mutationFn: ({ id, data }) => updateClass(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['class', classId] })
            Toast.show({
                type: 'success',
                text1: 'Class updated successfully!',
                position: 'top',
            })
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Failed to update class',
                text2: error.message || 'Please try again later',
                position: 'top',
            })
        },
    })

    const addDeckMutation = useMutation({
        mutationFn: ({ classId, deckId }) => addDeckToClass(classId, deckId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['classDecks', classId] })
            Toast.show({
                type: 'success',
                text1: 'Deck added to class successfully!',
                position: 'top',
            })
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Failed to add deck to class',
                text2: error.message || 'Please try again later',
                position: 'top',
            })
        },
    })

    const removeDeckMutation = useMutation({
        mutationFn: ({ classId, deckId }) =>
            removeDeckFromClass(classId, deckId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['classDecks', classId] })
            Toast.show({
                type: 'success',
                text1: 'Deck removed from class successfully!',
                position: 'top',
            })
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Failed to remove deck from class',
                text2: error.message || 'Please try again later',
                position: 'top',
            })
        },
    })

    const createClassMutation = useMutation({
        mutationFn: (data) => createClass(data),
        onSuccess: (newClass) => {
            router.replace({
                pathname: '/decks/classdetail',
                params: {
                    classId: newClass.id,
                    classTitle: newClass.name,
                },
            })
            setIsNewClass(false)
            queryClient.invalidateQueries({ queryKey: ['homeData'] })
            Toast.show({
                type: 'success',
                text1: 'Class created successfully!',
                position: 'top',
            })
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Failed to create class',
                text2: error.message || 'Please try again later',
                position: 'top',
            })
        },
    })

    useEffect(() => {
        if (classData && classData.name) {
            setClassTitle(classData.name)
        }
    }, [classData])

    useEffect(() => {
        if (selectedDecks && classId) {
            try {
                const selectedDecksList = JSON.parse(selectedDecks)
                selectedDecksList.forEach((deck) => {
                    addDeckMutation.mutate({ classId, deckId: deck.id })
                })
            } catch (e) {
                console.error('Error parsing selectedDecks:', e)
            }
        }
    }, [selectedDecks, classId])

    const handleSubmitTitle = () => {
        setIsEditingTitle(false)

        if (isNewClass) {
            // Create new class
            if (classTitle.trim()) {
                createClassMutation.mutate({ name: classTitle.trim() })
            }
        } else if (classId && classTitle !== classData?.name) {
            // Update existing class
            updateClassMutation.mutate({
                id: classId,
                data: { name: classTitle },
            })
        }
    }

    const handleAddDeck = useCallback(() => {
        setIsMoreVisible(false)
        router.push({
            pathname: '/decks/studieddecks',
            params: {
                classId,
                classTitle,
                returnTo: 'classdetail',
            },
        })
    }, [router, classId, classTitle])

    const handleDeckPress = (deckId) => {
        router.push({
            pathname: '/decks/deckdetail',
            params: { id: deckId },
        })
    }

    const handleEditDeck = async (deckId) => {
        // Find the deck object from the decks array
        const deckToEdit = decks.find((deck) => deck.id === deckId)

        if (!deckToEdit) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Deck not found',
                position: 'top',
            })
            return
        }

        try {
            // Fetch flashcard data for the deck
            const flashcards = await queryClient.fetchQuery({
                queryKey: ['flashcards', deckId],
                queryFn: () => getFlashcardsById(deckId),
            })

            // Navigate to deck edit screen with complete deck and flashcard data
            router.push({
                pathname: '/decks/editdeck',
                params: {
                    id: deckId,
                    deckData: JSON.stringify(deckToEdit),
                    flashcardData: JSON.stringify(flashcards),
                },
            })
        } catch (error) {
            console.error('Error fetching flashcards:', error)
            Toast.show({
                type: 'error',
                text1: 'Failed to fetch flashcards',
                text2: error.message || 'Please try again later',
                position: 'top',
            })
        }
    }

    const handleRemoveDeck = (deckId) => {
        Alert.alert(
            'Remove Deck',
            'Are you sure you want to remove this deck from the class?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () =>
                        removeDeckMutation.mutate({ classId, deckId }),
                },
            ],
        )
    }

    if ((isLoadingClass || isLoadingDecks) && !isNewClass) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#3D5CFF" />
                <Text style={styles.loadingText}>Loading class details...</Text>
            </View>
        )
    }

    if ((classError || decksError) && !isNewClass) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>
                    Error loading class:{' '}
                    {classError?.message || decksError?.message}
                </Text>
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={() => {
                        queryClient.invalidateQueries({
                            queryKey: ['class', classId],
                        })
                        queryClient.invalidateQueries({
                            queryKey: ['classDecks', classId],
                        })
                    }}
                >
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setIsEditingTitle(true)}
                        style={styles.headerContent}
                        activeOpacity={0.7}
                    >
                        {!isEditingTitle ? (
                            <Text style={styles.classTitle}>{classTitle}</Text>
                        ) : (
                            <TextInput
                                style={styles.classTitleInput}
                                value={classTitle}
                                onChangeText={setClassTitle}
                                onBlur={handleSubmitTitle}
                                onSubmitEditing={handleSubmitTitle}
                                autoFocus
                                returnKeyType="done"
                                maxLength={50}
                            />
                        )}
                    </TouchableOpacity>

                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={() => console.log('Share')}>
                            <Ionicons
                                name="share-outline"
                                size={24}
                                color="#000"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsMoreVisible(true)}
                            style={styles.moreButton}
                        >
                            <Ionicons
                                name="ellipsis-vertical"
                                size={24}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tabs */}
                <View style={styles.tabBar}>
                    {['Modules', 'Members'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            style={[
                                styles.tabItem,
                                activeTab === tab && styles.activeTabItem,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === tab && styles.activeTabText,
                                ]}
                            >
                                {tab === 'Modules' ? 'Decks' : 'Members'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Content */}
                <ScrollView contentContainerStyle={styles.content}>
                    {activeTab === 'Modules' ? (
                        decks.length === 0 ? (
                            <View style={styles.emptyBox}>
                                <Text style={styles.emptyTitle}>
                                    This class has no decks yet.
                                </Text>
                                <Text style={styles.emptyDesc}>
                                    Add or create a deck to get started.
                                </Text>
                                <TouchableOpacity
                                    onPress={handleAddDeck}
                                    style={styles.addButton}
                                    disabled={addDeckMutation.isPending}
                                >
                                    {addDeckMutation.isPending ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text style={styles.addButtonText}>
                                            Add Deck
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <FlatList
                                data={decks}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <SwipeableDeckCard
                                        deck={item}
                                        onPress={handleDeckPress}
                                        onEdit={handleEditDeck}
                                        onRemove={handleRemoveDeck}
                                        showAuthor={true}
                                    />
                                )}
                                scrollEnabled={false}
                                showsVerticalScrollIndicator={false}
                            />
                        )
                    ) : (
                        <MembersList />
                    )}
                </ScrollView>

                {/* Modal bottom sheet */}
                <BottomModal
                    isVisible={isMoreVisible}
                    onClose={() => setIsMoreVisible(false)}
                    onAddDeck={handleAddDeck}
                />
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: { paddingRight: 10 },
    headerContent: {
        flex: 1,
        marginLeft: 12,
    },
    classTitle: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
    },
    classTitleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#007AFF',
        paddingVertical: 2,
        color: '#000',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moreButton: { marginLeft: 16 },
    tabBar: {
        flexDirection: 'row',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tabItem: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    activeTabItem: {
        borderBottomWidth: 2,
        borderBottomColor: '#3D5CFF',
    },
    tabText: {
        color: '#888',
        fontSize: 16,
    },
    activeTabText: {
        color: '#3D5CFF',
        fontWeight: 'bold',
    },
    content: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    emptyBox: {
        backgroundColor: '#F7F7F7',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
    },
    emptyTitle: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyDesc: {
        color: '#555',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#3D5CFF',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        color: '#FF6B6B',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#3D5CFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})

export default ClassDetailScreen
