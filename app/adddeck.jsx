import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddDeck() {
    const router = useRouter();
    const [terms, setTerms] = useState([{ term: '', definition: '' }]);

    const handleAddField = () => {
        setTerms([...terms, { term: '', definition: '' }]);
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerRow}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Add Deck</Text>
                </View>

                <TextInput style={styles.input} placeholder="Title" placeholderTextColor="#333" />
                <TextInput style={[styles.input, styles.descriptionInput]} placeholder="Description" placeholderTextColor="#333" multiline/>

                {terms.map((item, index) => (
                    <View key={index} style={styles.termGroup}>
                        <TextInput style={styles.underlineInput} placeholder="Term" placeholderTextColor="#333"/>
                        <TextInput style={styles.underlineInput} placeholder="Definition" placeholderTextColor="#333" />
                    </View>
                ))}

                <TouchableOpacity onPress={handleAddField} style={styles.addButton}>
                    <Ionicons name="add" size={28} color="#fff" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 20,
        paddingBottom: 100,
        backgroundColor: '#fff',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    backButton: {
        marginRight: -20,
        alignSelf: 'flex-start',
        zIndex: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
    },
    descriptionInput: {
        height: 100,
        marginBottom: 30,
    },
    termGroup: {
        marginBottom: 20,
    },
    underlineInput: {
        borderBottomWidth: 1,
        borderColor: '#000',
        paddingVertical: 6,
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#3D5CFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
});
