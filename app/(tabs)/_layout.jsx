import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#3D5CFF",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="course"
                options={{
                    title: "Course",
                    tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="add"
                options={{
                    title: "Add",
                    tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline" color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="library"
                options={{
                    title: "Library",
                    tabBarIcon: ({ color, size }) => <Ionicons name="library-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
