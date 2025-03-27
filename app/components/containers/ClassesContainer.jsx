import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

// List of classes
export default function ClassesContainer({ classes }) {
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {classes.map((classItem, index) => (
                <View key={index} style={styles.classesContainer}>
                    <Text style={styles.classesLabel}>{classItem.name}</Text>
                    <Image source={{ uri: classItem.image }} style={styles.classesImg} />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    classesContainer: {
        borderWidth: 1,
        backgroundColor: 'white',
        margin: 20,
        marginRight: 0,
        marginBottom: 10,
        height: 200,
        width: 250,
        borderRadius: 10,   
    },

    classesLabel: {
        fontSize: 18,
        fontWeight: "bold",
        left: 20,
        top: 20
    },

    classesImg: {
        width: 200,
        height: 120,
        borderRadius: 10,
    },
});
