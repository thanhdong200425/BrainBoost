import React, { useCallback, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from 'react-native'
import { useRouter } from 'expo-router'
import { PieChart } from 'react-native-chart-kit'
import { SubmitButton, PieLegend, ContentCarousel } from '../../components'
import { AIGenerateModal } from '../../components/others'
import HomeHeader from '../../components/headers/HomeHeader'
import { useMutation, useQuery } from '@tanstack/react-query'
import { generateDeckWithAI, getHomeData } from '../../services/homeService'
import { ITEM_WIDTH } from '../../constants/sizes'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProgressSummaryCard from '../../components/others/ProgressSummaryCard'

export default function HomeScreen() {
    const router = useRouter()
    const [selectedDeckIndex, setSelectedDeckIndex] = useState(0)
    const [selectedClassIndex, setSelectedClassIndex] = useState(0)
    const [selectedFolderIndex, setSelectedFolderIndex] = useState(0)
    const [topic, setTopic] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const accessToken = useSelector((state) => state.auth.accessToken)
    const user = useSelector((state) => state.auth.user)

    const {
        data: homeData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['homeData'],
        queryFn: getHomeData,
        enabled: !!accessToken,
    })

    const generateDeckMutation = useMutation({
        mutationFn: generateDeckWithAI,
        onSuccess: (data) => {
            setIsModalVisible(false)
            router.push({
                pathname: '/decks/adddeck',
                params: {
                    title: topic || 'AI Generated Flashcards',
                    description:
                        data.description || 'Flashcards generated with AI',
                    flashcards: JSON.stringify(data.flashcards),
                },
            })
        },
        onError: (error) => {
            console.error('Error generating deck:', error)
        },
    })

    const navigateToDeckDetail = useCallback(
        (deck) => {
            router.push({
                pathname: '/decks/deckdetail',
                params: { id: deck.id },
            })
        },
        [router],
    )

    const navigateToClassDetail = useCallback(
        (classItem) => {
            router.push({
                pathname: '/decks/classdetail',
                params: {
                    classId: classItem.id,
                    classTitle: classItem.name,
                },
            })
        },
        [router],
    )

    const navigateToFolderDetail = useCallback(
        (folderItem) => {
            router.push({
                pathname: '/decks/folderdetail',
                params: {
                    folderId: folderItem.id,
                    folderTitle: folderItem.name,
                },
            })
        },
        [router],
    )

    const handleClickGenerateDeck = useCallback(() => {
        setIsModalVisible(true)
    }, [])

    const handleCloseModal = useCallback(() => {
        setIsModalVisible(false)
    }, [])

    const handleGenerateWithParams = useCallback((params) => {
        generateDeckMutation.mutate(params)
    }, [])

    if (isLoading)
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )

    if (isError)
        return (
            <View style={styles.loadingContainer}>
                <Text>Error: {error.message}</Text>
                <Text>Try to refresh the page</Text>
            </View>
        )

    const safeHomeData = homeData || { decks: [], classes: [], folders: [] }

    const userData = {
        name: user?.username || 'there',
        progress: [
            {
                name: 'Good',
                percentage: 70,
                color: '#A5D8FF',
                legendFontColor: '#7F7F7F',
                legendFontSize: 12,
            },
            {
                name: 'Need to learn more',
                percentage: 30,
                color: '#FDAF75',
                legendFontColor: '#7F7F7F',
                legendFontSize: 12,
            },
        ],
    }

    const handleScroll = (event, setIndex) => {
        const offsetX = event.nativeEvent.contentOffset.x
        const index = Math.round(offsetX / ITEM_WIDTH)
        setIndex(index)
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'right', 'left']}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <HomeHeader
                    userData={userData}
                    stats={{
                        decks: safeHomeData.decks?.length || 0,
                        classes: safeHomeData.classes?.length || 0,
                        folders: safeHomeData.folders?.length || 0,
                    }}
                />

                <View style={styles.content}>
                    <SubmitButton
                        isLoading={generateDeckMutation.isPending}
                        text="✨ Generate New Flashcards with AI ✨"
                        style={styles.buttonShadow}
                        onPress={handleClickGenerateDeck}
                        textStyle={{ fontSize: 15 }}
                    />

                    <Text style={styles.sectionTitle}>Your Decks</Text>
                    <ContentCarousel
                        items={safeHomeData.decks || []}
                        type="deck"
                        selectedIndex={selectedDeckIndex}
                        onScroll={(event) =>
                            handleScroll(event, setSelectedDeckIndex)
                        }
                        onPressItem={navigateToDeckDetail}
                    />

                    <Text style={styles.sectionTitle}>Your Classes</Text>
                    <ContentCarousel
                        items={safeHomeData.classes || []}
                        type="class"
                        selectedIndex={selectedClassIndex}
                        onScroll={(event) =>
                            handleScroll(event, setSelectedClassIndex)
                        }
                        onPressItem={navigateToClassDetail}
                    />

                    <Text style={styles.sectionTitle}>Your Folders</Text>
                    <ContentCarousel
                        items={safeHomeData.folders || []}
                        type="folder"
                        selectedIndex={selectedFolderIndex}
                        onScroll={(event) =>
                            handleScroll(event, setSelectedFolderIndex)
                        }
                        onPressItem={navigateToFolderDetail}
                    />

                    <ProgressSummaryCard
                        progress={userData.progress[0].percentage}
                        decks={safeHomeData.decks?.length || 0}
                        classes={safeHomeData.classes?.length || 0}
                        folders={safeHomeData.folders?.length || 0}
                    />
                </View>
            </ScrollView>

            {/* AI Generate Modal */}
            <AIGenerateModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                onGenerate={handleGenerateWithParams}
                isLoading={generateDeckMutation.isPending}
                topic={topic}
                setTopic={setTopic}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
    },
    content: {
        paddingTop: 20,
    },
    buttonShadow: {
        marginBottom: 25,
        backgroundColor: '#3D5CFF',
        borderRadius: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1A1F36',
        marginTop: 10,
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    chartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 130,
        paddingHorizontal: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
