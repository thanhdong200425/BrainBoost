import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const CIRCLE_SIZE = 72
const STROKE_WIDTH = 8
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const ProgressCircle = ({ percentage, color }) => {
    const strokeDashoffset = CIRCUMFERENCE * (1 - percentage / 100)
    return (
        <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
            <Circle
                cx={CIRCLE_SIZE / 2}
                cy={CIRCLE_SIZE / 2}
                r={RADIUS}
                stroke="#E3F2FD"
                strokeWidth={STROKE_WIDTH}
                fill="none"
            />
            <Circle
                cx={CIRCLE_SIZE / 2}
                cy={CIRCLE_SIZE / 2}
                r={RADIUS}
                stroke={color}
                strokeWidth={STROKE_WIDTH}
                fill="none"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
            />
            <Text
                style={StyleSheet.flatten([
                    styles.progressText,
                    {
                        left: 0,
                        right: 0,
                        top: 22,
                        position: 'absolute',
                        textAlign: 'center',
                    },
                ])}
            >
                {percentage}%
            </Text>
        </Svg>
    )
}

const StatItem = ({ icon, color, label, value }) => (
    <View style={styles.statItem}>
        <View style={[styles.iconBox, { backgroundColor: color + '22' }]}>
            <MaterialCommunityIcons name={icon} size={22} color={color} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
)

const ProgressSummaryCard = ({
    progress = 70,
    decks = 0,
    classes = 0,
    folders = 0,
}) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Your Progress</Text>
            <View style={styles.row}>
                <View style={styles.progressBox}>
                    <ProgressCircle percentage={progress} color="#64B5F6" />
                    <Text style={styles.progressLabel}>Good</Text>
                </View>
                <View style={styles.statsBox}>
                    <StatItem
                        icon="cards-outline"
                        color="#3D5CFF"
                        label="Decks"
                        value={decks}
                    />
                    <StatItem
                        icon="account-group"
                        color="#F57C00"
                        label="Classes"
                        value={classes}
                    />
                    <StatItem
                        icon="folder-multiple"
                        color="#1976D2"
                        label="Folders"
                        value={folders}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 28,
        shadowColor: '#1976D2',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A1F36',
        marginBottom: 18,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBox: {
        alignItems: 'center',
        marginRight: 24,
    },
    progressLabel: {
        marginTop: 8,
        fontSize: 14,
        color: '#1976D2',
        fontWeight: '600',
    },
    progressText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1976D2',
    },
    statsBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#222',
    },
    statLabel: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
})

export default ProgressSummaryCard
