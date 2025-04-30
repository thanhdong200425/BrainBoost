import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import FlipCard from 'react-native-flip-card'
import { Ionicons } from '@expo/vector-icons'

const { width } = Dimensions.get('window')
const itemWidth = width * 0.9

const FlashcardFlipCarousel = ({
    data,
    showIcon = false,
    onIconPress,
    cardWidth = itemWidth,
    cardHeight = 220,
}) => {
    return (
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <Carousel
                width={cardWidth}
                height={cardHeight}
                data={data}
                loop
                autoPlay={false}
                scrollAnimationDuration={1000}
                pagingEnabled={true}
                mode="parallax"
                style={{ alignSelf: 'center' }}
                renderItem={({ item }) => (
                    <FlipCard
                        style={[
                            styles.card,
                            { width: cardWidth, height: cardHeight },
                        ]}
                        friction={6}
                        perspective={1000}
                    >
                        {/* Front Face */}
                        <View
                            style={[
                                styles.face,
                                { width: cardWidth, height: cardHeight },
                            ]}
                        >
                            <Text style={styles.cardText}>
                                {item.frontText}
                            </Text>
                            {showIcon && (
                                <TouchableOpacity
                                    style={styles.cornerIcon}
                                    onPress={() => onIconPress?.(item)}
                                >
                                    <Ionicons
                                        name="expand-outline"
                                        size={20}
                                        color="#333"
                                    />
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Back Face */}
                        <View
                            style={[
                                styles.back,
                                { width: cardWidth, height: cardHeight },
                            ]}
                        >
                            <Text style={styles.cardText}>{item.backText}</Text>
                            {showIcon && (
                                <TouchableOpacity
                                    style={styles.cornerIcon}
                                    onPress={() => onIconPress?.(item)}
                                >
                                    <Ionicons
                                        name="expand-outline"
                                        size={20}
                                        color="#333"
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </FlipCard>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    face: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 1.5,
        borderColor: '#ccc',
        padding: 20,
    },
    back: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#ccc',
        padding: 20,
    },
    cardText: {
        fontSize: 20,
        fontWeight: 'semibold',
    },
    cornerIcon: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        padding: 6,
    },
})

export default FlashcardFlipCarousel
