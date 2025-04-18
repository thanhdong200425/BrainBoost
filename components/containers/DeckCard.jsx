// app/components/DeckCard.jsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";

export default function DeckCard({ title, progress, wordsLearned, totalWords, onContinuePress }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.imagePlaceholder} />
        <View style={styles.textContent}>
          <Text style={styles.title}>{title}</Text>
          <Progress.Bar
            progress={progress}
            width={null}
            color="#3D5CFF"
            unfilledColor="#E0E0E0"
            borderWidth={0}
            height={8}
            style={styles.progress}
          />
          <Text style={styles.progressText}>
            {wordsLearned} of {totalWords} words learned
          </Text>
          <View style={styles.bottomRow}>
            <Text style={styles.subText}>Need to learn more</Text>
            <TouchableOpacity style={styles.continueButton} onPress={onContinuePress}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: "#ccc",
  },
  textContent: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  progress: {
    marginBottom: 6,
  },
  progressText: {
    fontSize: 13,
    color: "#555",
    marginBottom: 8,
  },
  subText: {
    fontSize: 13,
    color: "#999",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "#3D5CFF",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  continueText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
