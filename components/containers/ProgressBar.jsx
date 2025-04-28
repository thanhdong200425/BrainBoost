import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress"

export default function ProgressBar({ value, color }) {
    return (
        <View style={styles.progressBars}>
            <Progress.Bar
                progress={value / 100}
                width={null}
                height={8}
                borderRadius={5}
                color={color}
                unfilledColor="#E0E0E0"
                borderWidth={0}
                style={styles.progressBar}
            />
            <Text style={styles.progressText}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    progressBars: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    progressBar: {
        flex: 1,
        marginRight: 10,
    },
    progressText: {
        fontSize: 15,
        color: "#A0A0A0",
    },
})