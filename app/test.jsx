import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

import ProgressBar from '../components/containers/ProgressBar';
import AnswerOption from '../components/containers/AnswerOption';
import SubmitButton from '../components/buttons/SubmitButton';

// Mock Data
const mockQuestions = [
  {
    id: 1,
    question: 'What is the meaning of "efficient"?',
    options: ['Tối ưu hoá', 'Hiệu quả', 'Mạnh mẽ', 'Nhanh chóng'],
    correctAnswer: 'Hiệu quả',
  },
  {
    id: 2,
    question: 'What is the meaning of "robust"?',
    options: ['Mạnh mẽ', 'Hiệu quả', 'Chính xác', 'Tối ưu hoá'],
    correctAnswer: 'Mạnh mẽ',
  },
];

export default function TestScreen() {
  const router = useRouter();
  const { deckId } = useLocalSearchParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [responses, setResponses] = useState([]);

  const totalQuestions = mockQuestions.length;
  const currentQuestion = mockQuestions[currentIndex];
  const isLast = currentIndex === totalQuestions - 1;

  const handleClose = () => router.back();
  const handleSettings = () => {};
  const handleSkip = () => {
    setResponses(prev => [...prev, null]);
    if (!isLast) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
    }
  };
  const handleAnswer = option => {
    if (selectedOption === null) setSelectedOption(option);
  };
  const handleNextOrFinish = () => {
    const allResponses = [...responses, selectedOption];
    if (!isLast) {
      setResponses(allResponses);
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      const correctCount = allResponses.filter(
        (ans, idx) => ans === mockQuestions[idx].correctAnswer
      ).length;
      const wrongList = mockQuestions.filter(
        (_, idx) => allResponses[idx] !== mockQuestions[idx].correctAnswer
      );
      router.push({
        pathname: '/result_test',
        params: {
          deckId,
          correctCount: String(correctCount),
          total: String(totalQuestions),
          incorrectAnswers: JSON.stringify(wrongList),
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.iconBtn}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Test</Text>
        <TouchableOpacity onPress={handleSettings} style={styles.iconBtn}>
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Progress */}
      <ProgressBar current={currentIndex + 1} total={totalQuestions} />

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Question and Skip */}
        <View style={styles.questionHeaderRow}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Answer Options */}
        {currentQuestion.options.map((opt, idx) => (
          <AnswerOption
            key={idx}
            option={opt}
            onPress={() => handleAnswer(opt)}
            isSelected={selectedOption === opt}
            isCorrect={selectedOption !== null && opt === currentQuestion.correctAnswer}
            disabled={selectedOption !== null}
          />
        ))}

        {/* Next / Finish */}
        {selectedOption !== null && (
          <SubmitButton
            text={isLast ? 'Finish' : 'Next'}
            onPress={handleNextOrFinish}
            style={styles.nextBtn}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  iconBtn: { padding: 8 },

  contentContainer: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },

  questionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3D5CFF',
  },

  nextBtn: { marginTop: 30, width: '60%', alignSelf: 'center' },
});
