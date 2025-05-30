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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { LinearGradient } from 'expo-linear-gradient'
import BottomModal from '../../components/containers/BottomModal'
import SwipeableDeckCard from '../../components/containers/SwipeableDeckCard'
import {
    getFolderById,
    updateFolder,
    getFolderDecks,
    addDeckToFolder,
    removeDeckFromFolder,
    createFolder,
} from '../../services/folderService'
import { getFlashcardsById } from '../../services/deckService'

const FolderDetailScreen = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const {
        folderId,
        folderTitle: initialFolderTitle = 'New Folder',
        selectedDecks,
    } = useLocalSearchParams()

    const [folderTitle, setFolderTitle] = useState(initialFolderTitle)
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [isMoreVisible, setIsMoreVisible] = useState(false)
    const [isNewFolder, setIsNewFolder] = useState(folderId === 'new')

    const {
        data: folderData,
        isLoading: isLoadingFolder,
        error: folderError,
    } = useQuery({
        queryKey: ['folder', folderId],
        queryFn: () => getFolderById(folderId),
        enabled: !!folderId && folderId !== 'new',
    })

    const {
        data: decks = [],
        isLoading: isLoadingDecks,
        error: decksError,
    } = useQuery({
        queryKey: ['folderDecks', folderId],
        queryFn: () => getFolderDecks(folderId),
        enabled: !!folderId && folderId !== 'new',
    })

    const updateFolderMutation = useMutation({
        mutationFn: ({ id, data }) => updateFolder(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['folder', folderId] })
            Toast.show({
                type: 'success',
                text1: 'Folder updated successfully!',
                position: 'top',
            })
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Failed to update folder',
                text2: error.message || 'Please try again later',
                position: 'top',
            })
        },
    })

    const addDeckMutation = useMutation({
        mutationFn: ({ folderId, deckId }) => addDeckToFolder(folderId, deckId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['folderDecks', folderId],
            })
            Toast.show({
                type: 'success',
                text1: 'Deck added to folder successfully!',
                position: 'top',
            })
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Failed to add deck to folder',
                text2: error.message || 'Please try again later',
                position: 'top',
            })
        },
    })

    const removeDeckMutation = useMutation({
        mutationFn: ({ folderId, deckId }) =>
            removeDeckFromFolder(folderId, deckId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['folderDecks', folderId],
            })
            Toast.show({
                type: 'success',
                text1: 'Deck removed from folder successfully!',
                position: 'top',
            })
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Failed to remove deck from folder',
                text2: error.message || 'Please try again later',
                position: 'top',
            })
        },
    })

    const createFolderMutation = useMutation({
        mutationFn: (data) => createFolder(data),
        onSuccess: (newFolder) => {
            router.replace({
                pathname: '/decks/folderdetail',
                params: {
                    folderId: newFolder.id,
                    folderTitle: newFolder.name,
                },
            })
            setIsNewFolder(false)
            queryClient.invalidateQueries({ queryKey: ['homeData'] })

            // Add selected decks to the newly created folder
            if (selectedDecks) {
                try {
                    const selectedDecksList = JSON.parse(selectedDecks)
                    selectedDecksList.forEach((deck) => {
                        addDeckMutation.mutate({
                            folderId: newFolder.id,
                            deckId: deck.id,
                        })
                    })
                } catch (e) {
                    console.error('Error parsing selectedDecks:', e)
                }
            }

            Toast.show({
                type: 'success',
                text1: 'Folder created successfully!',
                position: 'top',
            })
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Failed to create folder',
                text2: error.message || 'Please try again later',
                position: 'top',
            })
        },
    })

    useEffect(() => {
        if (folderData && folderData.name) {
            setFolderTitle(folderData.name)
        }
    }, [folderData])

    useEffect(() => {
        if (selectedDecks && folderId && folderId !== 'new' && !isNewFolder) {
            try {
                const selectedDecksList = JSON.parse(selectedDecks)
                selectedDecksList.forEach((deck) => {
                    addDeckMutation.mutate({ folderId, deckId: deck.id })
                })
            } catch (e) {
                console.error('Error parsing selectedDecks:', e)
            }
        }
    }, [selectedDecks, folderId, isNewFolder])

    const handleSubmitTitle = () => {
        setIsEditingTitle(false)

        if (isNewFolder) {
            // Create new folder
            if (folderTitle.trim()) {
                createFolderMutation.mutate({
                    name: folderTitle.trim(),
                    visibility: 'private',
                })
            }
        } else if (folderId && folderTitle !== folderData?.name) {
            // Update existing folder
            updateFolderMutation.mutate({
                id: folderId,
                data: { name: folderTitle },
            })
        }
    }

    const handleAddDeck = useCallback(() => {
        setIsMoreVisible(false)
        router.push({
            pathname: '/decks/studieddecks',
            params: {
                folderId,
                folderTitle,
                returnTo: 'folderdetail',
            },
        })
    }, [router, folderId, folderTitle])

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
            'Are you sure you want to remove this deck from the folder?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () =>
                        removeDeckMutation.mutate({ folderId, deckId }),
                },
            ],
        )
    }

    if ((isLoadingFolder || isLoadingDecks) && !isNewFolder) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>
                    Loading folder details...
                </Text>
            </View>
        )
    }

    if ((folderError || decksError) && !isNewFolder) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>
                    Error loading folder:{' '}
                    {folderError?.message || decksError?.message}
                </Text>
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={() => {
                        queryClient.invalidateQueries({
                            queryKey: ['folder', folderId],
                        })
                        queryClient.invalidateQueries({
                            queryKey: ['folderDecks', folderId],
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
                <LinearGradient
                    colors={['#1E88E5', '#1976D2', '#1565C0']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.headerContainer}
                >
                    <View style={styles.headerContent}>
                        {/* Navigation and Title Row */}
                        <View style={styles.headerRow}>
                            <TouchableOpacity
                                onPress={() => router.back()}
                                style={styles.navButton}
                            >
                                <LinearGradient
                                    colors={[
                                        'rgba(255,255,255,0.25)',
                                        'rgba(255,255,255,0.1)',
                                    ]}
                                    style={styles.navButtonGradient}
                                >
                                    <Ionicons
                                        name="chevron-back"
                                        size={20}
                                        color="#FFFFFF"
                                    />
                                </LinearGradient>
                            </TouchableOpacity>

                            <View style={styles.titleSection}>
                                <TouchableOpacity
                                    onPress={() => setIsEditingTitle(true)}
                                    activeOpacity={0.8}
                                    style={styles.titleContainer}
                                >
                                    <View style={styles.titleContent}>
                                        <MaterialCommunityIcons
                                            name="folder-multiple"
                                            size={20}
                                            color="#FFFFFF"
                                            style={styles.titleIcon}
                                        />
                                        {!isEditingTitle ? (
                                            <Text style={styles.folderTitle}>
                                                {folderTitle}
                                            </Text>
                                        ) : (
                                            <TextInput
                                                style={styles.folderTitleInput}
                                                value={folderTitle}
                                                onChangeText={setFolderTitle}
                                                onBlur={handleSubmitTitle}
                                                onSubmitEditing={
                                                    handleSubmitTitle
                                                }
                                                autoFocus
                                                returnKeyType="done"
                                                maxLength={50}
                                                placeholderTextColor="rgba(255,255,255,0.6)"
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                onPress={() => setIsMoreVisible(true)}
                                style={styles.navButton}
                            >
                                <LinearGradient
                                    colors={[
                                        'rgba(255,255,255,0.25)',
                                        'rgba(255,255,255,0.1)',
                                    ]}
                                    style={styles.navButtonGradient}
                                >
                                    <Ionicons
                                        name="add"
                                        size={20}
                                        color="#FFFFFF"
                                    />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        {/* Stats Section */}
                        <View style={styles.statsContainer}>
                            <View style={styles.statsRow}>
                                <View style={styles.statItem}>
                                    <MaterialCommunityIcons
                                        name="cards-outline"
                                        size={12}
                                        color="rgba(255,255,255,0.8)"
                                    />
                                    <Text style={styles.statText}>
                                        {decks.length}{' '}
                                        {decks.length === 1 ? 'deck' : 'decks'}
                                    </Text>
                                </View>

                                <View style={styles.statDivider} />

                                <View style={styles.statItem}>
                                    <MaterialCommunityIcons
                                        name="lock-outline"
                                        size={12}
                                        color="rgba(255,255,255,0.8)"
                                    />
                                    <Text style={styles.statText}>Private</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                {/* Content */}
                <ScrollView contentContainerStyle={styles.content}>
                    {decks.length === 0 ? (
                        <View style={styles.emptyBox}>
                            <MaterialCommunityIcons
                                name="folder-open-outline"
                                size={80}
                                color="#64B5F6"
                                style={styles.emptyIcon}
                            />
                            <Text style={styles.emptyTitle}>
                                This folder is empty.
                            </Text>
                            <Text style={styles.emptyDesc}>
                                Add some decks to organize your study materials.
                            </Text>
                            <TouchableOpacity
                                onPress={handleAddDeck}
                                style={styles.emptyAddButton}
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
                    )}
                </ScrollView>

                {/* Modal bottom sheet */}
                <BottomModal
                    isVisible={isMoreVisible}
                    onClose={() => setIsMoreVisible(false)}
                    onAddDeck={handleAddDeck}
                    showInviteMembers={false}
                />
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        paddingTop: 55,
        paddingBottom: 16,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#1976D2',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
        overflow: 'hidden',
    },
    headerContent: {
        paddingHorizontal: 20,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    navButton: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    navButtonGradient: {
        width: 36,
        height: 36,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    titleSection: {
        flex: 1,
        marginHorizontal: 16,
    },
    titleContainer: {
        alignItems: 'center',
    },
    titleContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleIcon: {
        marginRight: 8,
    },
    folderTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
    folderTitleInput: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.6)',
        paddingVertical: 4,
        paddingHorizontal: 12,
        minWidth: 150,
    },
    statsContainer: {
        marginHorizontal: 0,
        marginBottom: 8,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    statDivider: {
        width: 0.5,
        height: 12,
        backgroundColor: 'rgba(255,255,255,0.4)',
        marginHorizontal: 6,
    },
    statText: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 11,
        fontWeight: '500',
        marginLeft: 3,
    },
    content: {
        flexGrow: 1,
        padding: 24,
        backgroundColor: '#F5F7FA',
    },
    emptyBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
        borderWidth: 1,
        borderColor: 'rgba(25, 118, 210, 0.1)',
    },
    emptyIcon: {
        marginBottom: 20,
    },
    emptyTitle: {
        color: '#1976D2',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 12,
        textAlign: 'center',
    },
    emptyDesc: {
        color: '#64748B',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
        maxWidth: 280,
    },
    emptyAddButton: {
        backgroundColor: '#1976D2',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 32,
        shadowColor: '#1976D2',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#64748B',
        fontWeight: '500',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        fontWeight: '600',
    },
    retryButton: {
        backgroundColor: '#1976D2',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
        shadowColor: '#1976D2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
    },
})

export default FolderDetailScreen
