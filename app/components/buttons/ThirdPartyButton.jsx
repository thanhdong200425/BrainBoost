import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function ThirdPartyButton({ iconName, size, color }) {
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Ionicons name={iconName} size={size} color={color} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#3D5CFF",
        borderRadius: 25,
        padding: 10,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 15,
    },
});
