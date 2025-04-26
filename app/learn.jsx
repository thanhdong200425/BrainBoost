import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { Lightbulb } from "lucide-react-native";
import SubmitButton from '../components/buttons/SubmitButton';
import QuestionHeader from '../components/containers/QuestionHeader';
import AnswerOption from '../components/containers/AnswerOption';
import ProgressBar from '../components/containers/ProgressBar';

const mockFlashcards = [
  { question: "What is the meaning of 'efficient'?", options: ["Hiệu quả", "Tối ưu hóa", "Nhanh chóng", "Mạnh mẽ"], correctAnswer: "Hiệu quả" },
  { question: "What does 'optimize' mean?", options: ["Giảm tốc", "Tối ưu hóa", "Phân tích", "Dự đoán"], correctAnswer: "Tối ưu hóa" },
  { question: "What is the capital of France?", options: ["London", "Paris", "Rome", "Berlin"], correctAnswer: "Paris" },
];

const LearnScreen = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [state, setState] = useState({
    currentIndex: 0,
    selectedOption: null,
    isAnswered: false,
    showHint: false,
    correctCount: 0,
  });

  const currentCard = mockFlashcards[state.currentIndex];
  const isFinished = state.currentIndex === mockFlashcards.length - 1 && state.isAnswered;

  const handleOptionPress = (option) => {
    if (!state.isAnswered) {
      setState(prev => ({
        ...prev,
        selectedOption: option,
        isAnswered: true,
        correctCount: option === currentCard.correctAnswer ? prev.correctCount + 1 : prev.correctCount,
      }));
    }
  };

  const handleNext = () => {
    if (state.currentIndex < mockFlashcards.length - 1) {
      setState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedOption: null,
        isAnswered: false,
        showHint: false,
      }));
      fadeAnim.setValue(0);
    }
  };

  const handleShowHint = () => {
    if (state.showHint) {
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
        setState(prev => ({ ...prev, showHint: false }));
      });
    } else {
      setState(prev => ({ ...prev, showHint: true }));
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }
  };

  const handleFinish = () => {
    router.push({
      pathname: '/result',
      params: {
        correctCount: state.correctCount,
        total: mockFlashcards.length,
      },
    });
  };

  if (!currentCard) {
    return (
      <View style={styles.container}>
        <Text style={styles.noCardsText}>No flashcards available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learn</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Progress */}
      <ProgressBar current={state.currentIndex + 1} total={mockFlashcards.length} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Question + Hint */}
        <View style={styles.questionRow}>
          <QuestionHeader question={currentCard.question} />
          <TouchableOpacity onPress={handleShowHint}>
            <Lightbulb size={26} color="#3D5CFF" />
          </TouchableOpacity>
        </View>

        {/* Hint Box */}
        {state.showHint && (
          <Animated.View style={[styles.hintBox, { opacity: fadeAnim }]}>
            <Text style={styles.hintText}>Hint: {currentCard.correctAnswer}</Text>
          </Animated.View>
        )}

        {/* Answer Options */}
        {currentCard.options.map((option, index) => (
          <AnswerOption
            key={index}
            option={option}
            onPress={() => handleOptionPress(option)}
            isCorrect={option === currentCard.correctAnswer}
            isSelected={option === state.selectedOption}
            disabled={state.isAnswered}
          />
        ))}

        {/* Next or Finish Button */}
        {state.isAnswered && (
          <SubmitButton
            onPress={isFinished ? handleFinish : handleNext}
            text={isFinished ? "Finish" : "Next"}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default LearnScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF",
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#EEE',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#333',
    },
    content: {
      marginTop: 30,
      paddingHorizontal: 20,
    },
    questionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    hintBox: {
      backgroundColor: '#F0F5FF',
      borderRadius: 12,
      padding: 12,
      marginBottom: 20,
      marginTop: -10,
      borderLeftWidth: 4,
      borderLeftColor: '#3D5CFF',
    },
    hintText: {
      color: '#333',
      fontSize: 15,
    },
    noCardsText: {
      flex: 1,
      textAlign: 'center',
      marginTop: 50,
      fontSize: 16,
      color: '#666',
    },
  });
  