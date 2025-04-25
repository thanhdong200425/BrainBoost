import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function StatItem({ iconName, iconColor, number, label }) {
    return (
        <View style={styles.statItem}>
            <Icon name={iconName} size={40} color={iconColor} />
            <Text style={styles.statNumber}>{number}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    statItem: {
        alignItems: "center",
        padding: 12,
        borderRadius: 5,
        paddingVertical: 25,
        backgroundColor: "#f7fcff",
    },
    statNumber: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 5,
    },
    statLabel: {
        fontSize: 14,
        color: "#A0A0A0",
        marginTop: 5,
    },
});
