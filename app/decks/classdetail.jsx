import React, { useState, useCallback } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, useLocalSearchParams } from 'expo-router'
import Modal from 'react-native-modal'
import DeckList from '../../components/containers/DeckList'
import MembersList from '../../components/containers/MembersList'
import BottomModal from '../../components/containers/BottomModal'

const ClassDetailScreen = () => {
    const router = useRouter()
    const { classTitle = 'Name Class' } = useLocalSearchParams()

    const [activeTab, setActiveTab] = useState('Modules')
    const [modules, setModules] = useState([])
    const [isMoreVisible, setIsMoreVisible] = useState(false)

    const handleAddDeck = useCallback(() => {
        setIsMoreVisible(false)
        router.push({
            pathname: '/decks/adddeck',
            params: { classTitle, returnTo: 'classdetail' },
        })
    }, [router, classTitle])

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>

                <View style={styles.headerContent}>
                    <Text style={styles.classTitle}>{classTitle}</Text>
                    <Text style={styles.subText}>{modules.length} decks</Text>
                </View>

                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={() => console.log('Share')}>
                        <Ionicons name="share-outline" size={24} color="#000" />
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
                    modules.length === 0 ? (
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
                            >
                                <Text style={styles.addButtonText}>
                                    Add Deck
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <DeckList modules={modules} onAddDeck={handleAddDeck} />
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
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
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
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moreButton: { marginLeft: 16 },
    classTitle: { color: '#000', fontSize: 24, fontWeight: 'bold' },
    subText: { color: '#666', fontSize: 14, marginTop: 4 },
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
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
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
        borderBottomColor: '#007AFF',
    },
    tabText: {
        color: '#888',
        fontSize: 16,
    },
    activeTabText: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
})

export default ClassDetailScreen
