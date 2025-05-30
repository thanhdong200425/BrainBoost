import React, { useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Alert,
} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import DeckCard from './DeckCard'

const SwipeableDeckCard = ({
    deck,
    onPress,
    onRemove,
    onEdit,
    showAuthor = false,
    ...props
}) => {
    const swipeableRef = useRef(null)

    const handleHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

    const renderRightAction = (text, color, x, progress, onPress) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        })

        const scale = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
        })

        const pressHandler = () => {
            handleHapticFeedback()
            swipeableRef.current?.close()
            onPress()
        }

        return (
            <Animated.View
                style={[
                    styles.actionContainer,
                    { transform: [{ translateX: trans }, { scale }] },
                ]}
            >
                <TouchableOpacity
                    style={[styles.rightAction, { backgroundColor: color }]}
                    onPress={pressHandler}
                    activeOpacity={0.8}
                >
                    <Ionicons name="pencil-outline" size={24} color="#fff" />
                    <Text style={styles.actionText}>{text}</Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    const renderRightActions = (progress) => (
        <View style={styles.rightActions}>
            {renderRightAction('Edit', '#3D5CFF', 100, progress, () => {
                if (onEdit) {
                    onEdit(deck.id)
                } else {
                    console.log('Edit deck:', deck.id)
                }
            })}
        </View>
    )

    return (
        <Swipeable
            ref={swipeableRef}
            renderRightActions={renderRightActions}
            rightThreshold={40}
            overshootRight={false}
            friction={2}
        >
            <DeckCard
                name={deck.name}
                description={deck.description}
                visibility={deck.visibility}
                updatedAt={deck.updatedAt}
                author={showAuthor ? deck.author : undefined}
                onPress={() => onPress(deck.id)}
                onLongPress={() => {
                    // Handle remove on long press
                    if (onRemove) {
                        Alert.alert(
                            'Remove Deck',
                            'Are you sure you want to remove this deck from the class?',
                            [
                                { text: 'Cancel', style: 'cancel' },
                                {
                                    text: 'Remove',
                                    style: 'destructive',
                                    onPress: () => onRemove(deck.id),
                                },
                            ],
                        )
                    }
                }}
                onEdit={() => {
                    if (onEdit) {
                        onEdit(deck.id)
                    }
                }}
                onStudy={() => {
                    // Handle study if needed
                    console.log('Study deck:', deck.id)
                }}
                {...props}
            />
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    rightActions: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
    },
    actionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightAction: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: '85%',
        borderRadius: 16,
        marginRight: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    actionText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 4,
    },
})

export default SwipeableDeckCard
