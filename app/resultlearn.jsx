import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Trophy, X } from 'lucide-react-native';
import SubmitButton from '../components/buttons/SubmitButton'; 

const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

const ResultLearnScreen = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const correctCount = parseInt(params.correctCount || '0', 10);
    const total = parseInt(params.total || '0', 10);
    const flashcards = params.flashcards || '[]';

    const handlePracticeMore = () => {
        let parsed = [];
        try {
            parsed = JSON.parse(flashcards || '[]');
        } catch (err) {
            console.warn('Invalid flashcards JSON', err);
        }

        const shuffled = shuffleArray(parsed);

        router.replace({
            pathname: '/learn',
            params: { shuffledFlashcards: JSON.stringify(shuffled) },
        });
    };

    const handleTakeTest = () => {
        router.push('/test');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => router.back()}
            >
                <X size={28} color="#555" />
            </TouchableOpacity>

            <View style={styles.trophyBox}>
                <Trophy size={64} color="#FFB800" />
            </View>

            <Text style={styles.scoreText}>
                You got {correctCount}/{total} correct!
            </Text>

            <Text style={styles.title}>Way to go! You've studied all the terms.</Text>
            <Text style={styles.description}>
                Try another round so you can get more practice with the tough ones.
            </Text>

            <SubmitButton
            onPress={handlePracticeMore}
            text="Practice more"
            style={styles.primaryButton}
            textStyle={styles.primaryButtonText}
            />

            <SubmitButton
            onPress={handleTakeTest}
            text="Take a test"
            style={styles.secondaryButton}
            textStyle={styles.secondaryButtonText}
            />


        </View>
    );
};

export default ResultLearnScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 24,
        paddingTop: 60,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
    trophyBox: {
        marginTop: 60,
        marginBottom: 12,
        backgroundColor: '#FFF4D4',
        borderRadius: 100,
        padding: 30,
    },
    scoreText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        color: '#222',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        color: '#555',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 22,
    },
    primaryButton: {
        width: '100%',
        backgroundColor: '#3D5CFF',
        paddingVertical: 14,
        borderRadius: 12,
        marginBottom: 14,
        marginTop: 250,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        width: '100%',
        backgroundColor: '#F5F6FA',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
});
