import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import * as Progress from "react-native-progress";
import Icon from "react-native-vector-icons/FontAwesome"

export default function HomeScreen() {

    const userData = {
        name: "Lam",
        avatar: "",
        progress: 46,
        totalProgress: 60,
        learningPlan: [
            { name: "Packaging Design", progress: 40, total: 48 },
            { name: "Product Design", progress: 6, total: 24 },
        ],
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Hi, {userData.name}</Text>
                        <Text style={styles.subtext}>Let's start learning</Text>
                    </View>
                    <Image source={{ uri: userData.avatar }} style={styles.avatar} />
                </View>
            </View>

            <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                    <Text style={styles.progressText}>Learned today</Text>
                    <Text style={styles.myCourses}>My courses</Text>
                </View>

                <Text style={styles.progressValue}>
                    <Text style={styles.progressCurrent}>{userData.progress} min </Text>/{userData.totalProgress} min
                </Text>

                <Progress.Bar
                    progress={userData.progress / userData.totalProgress}
                    width={null}
                    height={10}
                    borderRadius={5}
                    color="blue"
                    unfilledColor="#e0e0e0"
                    borderWidth={1}
                    style={styles.progressBar}
                />
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.courseContainer}>
                    <TouchableOpacity style={styles.getStartedButton}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.courseContainer}>
                    <TouchableOpacity style={styles.getStartedButton}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.courseContainer}>
                    <TouchableOpacity style={styles.getStartedButton}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.courseContainer}>
                    <TouchableOpacity style={styles.getStartedButton}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Text style={styles.sectionTitle}>Learning Plan</Text>
            <View style={styles.learningPlanContainer}>
                {userData.learningPlan.map((course, index) => (
                    <View key={index} style={styles.courseItem}>
                        <Progress.Circle
                            size={30}
                            progress={course.progress / course.total}
                            color="blue"
                            unfilledColor="#e0e0e0"
                            borderWidth={0}
                        />

                        <View style={styles.courseInfo}>
                            <Text style={styles.courseName}>{course.name}</Text>
                            <Text style={styles.courseProgress}>{course.progress}/{course.total}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.classesContainer}>
                <Text style={styles.classesLabel}>
                    Classes
                </Text>
                <Image style={styles.classesImg} src='./'></Image>
            </View>

            <Text style={styles.sectionTitle}>Start With</Text>
            <View style={styles.categoriesContainer}>
                <View style={styles.category}>
                    <Icon name="paw" size={24} color="blue"/>
                    <Text style={styles.categoryText}>Animal</Text>
                </View>
                <View style={styles.category}>
                    <Icon name="futbol-o" size={24} color="blue"/>
                    <Text style={styles.categoryText}>Sport</Text>
                </View>
                <View style={styles.category}>
                    <Icon name="briefcase" size={24} color="blue"/>
                    <Text style={styles.categoryText}>Job</Text>
                </View>

                <View style={styles.category}>
                    <Icon name="briefcase" size={24} color="blue"/>
                    <Text style={styles.categoryText}>Job</Text>
                </View>

                <View style={styles.category}>
                    <Icon name="briefcase" size={24} color="blue"/>
                    <Text style={styles.categoryText}>Job</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    headerContainer: {
        padding: 25,
        backgroundColor: "blue",
        height: 170,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    greeting: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },

    subtext: {
        fontSize: 16,
        color: "white",
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    progressContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        margin: 20,
        marginTop: -60,
        borderWidth: 1,
    },

    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },

    progressText: {
        fontSize: 16,
    },

    progressValue: {
        fontSize: 18,
    },

    progressCurrent: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },

    progressBar: {
        marginTop: 8,
        height: 10,
        borderRadius: 5,
    },

    myCourses: {
        color: "blue",
        textAlign: "right",
        marginTop: 5,
    },

    courseContainer: {
        flex: 1,
        borderWidth: 1,
        backgroundColor: "white",
        borderRadius: 10,
        marginLeft: 20,
        marginBottom: 10,
        width: 270,
        height: 170,
    },

    getStartedButton: {
        position: "absolute",
        bottom: 10,
        left: 10,
        backgroundColor: "black",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    learningPlanContainer: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: 20,
        padding: 20,
    },

    courseItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },

    courseInfo: {
        marginLeft: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },

    courseName: {
        fontSize: 16,
        fontWeight: "bold",
    },

    courseProgress: {
        fontSize: 14,
        color: "#888",
    },

    classesContainer: {
        borderWidth: 1,
        backgroundColor: 'white',
        margin: 20,
        marginBottom: 10,
        height: 200,
        // padding: 15,
        borderRadius: 10,
    },

    classesLabel: {
        fontSize: 26,
        fontWeight: "bold",
        top: 20,
        left: 20
    },

    categoriesContainer:{
        flexDirection: "colomn", 
        justifyContent: "space-around", 
        paddingHorizontal: 20,
    },

    category: {
        flexDirection: "row",   
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        padding: 15,
        marginBottom: 10,
    },

    categoryText: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 20,
    },
});
