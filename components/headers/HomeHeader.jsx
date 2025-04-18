import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const HomeHeader = ({ userData }) => {
    const router = useRouter();

    return (
        <View style={styles.headerContainer}>
            {/* Search and Profile Row */}
            <View style={styles.topRow}>
                <View style={styles.searchContainer}>
                    <MaterialCommunityIcons name="magnify" size={24} color="#666" style={{ marginLeft: 12 }} />
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor="#666"
                        style={styles.searchInput}
                    />
                </View>
                <TouchableOpacity onPress={() => router.push("/profile")}>
                    <Image 
                        source={{ uri: 'https://picsum.photos/200' }}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
            </View>

            {/* Greeting Section */}
            <View style={styles.greetingContainer}>
                <Text style={styles.greeting}>Hi, {userData.name}</Text>
                <Text style={styles.subGreeting}>Ready to boost your vocabulary?</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingHorizontal: 16,
        paddingBottom: 16,
        alignSelf: 'center',
        width: '100%',
        maxWidth: 600,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingVertical: 8,
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 8,
        color: '#1A1F36',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#3D5CFF',
    },
    greetingContainer: {
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A1F36',
        marginBottom: 8,
    },
    subGreeting: {
        fontSize: 16,
        color: '#666',
        letterSpacing: 0.3,
    },
});

export default HomeHeader; 