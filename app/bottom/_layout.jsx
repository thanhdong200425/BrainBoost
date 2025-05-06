import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { View, StyleSheet } from 'react-native'

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#3D5CFF',
                tabBarInactiveTintColor: '#929292',
                tabBarStyle: {
                    height: 70,
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    width: '100%',
                    paddingVertical: 10,
                    elevation: 10,
                    shadowColor: '#FFF',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    borderTopWidth: 1,
                    borderTopColor: '#efefef',
                },
                tabBarItemStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="decks"
                options={{
                    title: 'Decks',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="folder-open"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="add"
                options={{
                    title: 'Add',
                    tabBarIcon: ({ color }) => (
                        <View style={styles.addButtonContainer}>
                            <View style={styles.addButton}>
                                <Ionicons
                                    name="add"
                                    color="#FFFFFF"
                                    size={38}
                                />
                            </View>
                        </View>
                    ),
                    tabBarShowLabel: false,
                }}
            />
            <Tabs.Screen
                name="library"
                options={{
                    title: 'Library',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="notifications"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    addButtonContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 35,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3D5CFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    addButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#3D5CFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
})
