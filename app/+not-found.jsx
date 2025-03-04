import { Link } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NotFound() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.errorCode}>404</Text>
                <View style={styles.divider} />
                <Text style={styles.title}>Page Not Found</Text>
                <Text style={styles.description}>The page you are looking for doesn't exist or has been moved.</Text>

                <Link href="/" asChild>
                    <TouchableOpacity style={styles.button}>
                        <Ionicons name="arrow-back" size={20} color="#ffffff" />
                        <Text style={styles.buttonText}>Back to Home</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1a1a2e",
        padding: 16,
    },
    content: {
        alignItems: "center",
        maxWidth: 300,
    },
    errorCode: {
        fontSize: 80,
        fontWeight: "bold",
        color: "#3D5CFF",
        marginBottom: 16,
    },
    divider: {
        height: 2,
        width: 80,
        backgroundColor: "#3D5CFF",
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: "#cccccc",
        textAlign: "center",
        marginBottom: 32,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#3D5CFF",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        gap: 8,
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
    },
});
