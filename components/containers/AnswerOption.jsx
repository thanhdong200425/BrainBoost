import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AnswerOption = ({ option, onPress, isCorrect, isSelected, disabled }) => {
    let optionStyle = styles.optionButton;
    if (disabled) {
        if (isCorrect) {
            optionStyle = [styles.optionButton, styles.correctOption];
        } else if (isSelected) {
            optionStyle = [styles.optionButton, styles.wrongOption];
        }
    }

    return (
        <TouchableOpacity style={optionStyle} onPress={onPress} disabled={disabled}>
            <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
    );
};

export default AnswerOption;

const styles = StyleSheet.create({
    optionButton: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 12,
        marginBottom: 15,
    },
    correctOption: {
        backgroundColor: '#E6FFF0',
        borderColor: '#4CAF50',
    },
    wrongOption: {
        backgroundColor: '#FFE6E6',
        borderColor: '#FF5252',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
});
