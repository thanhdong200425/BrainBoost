import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, View, Image, ActivityIndicator, Platform } from "react-native";
import * as Progress from "react-native-progress"
import Icon from "react-native-vector-icons/FontAwesome"
import { Ionicons } from '@expo/vector-icons';
import { BarChart } from "react-native-gifted-charts";
import serverApi from '../../helpers/axios';
import { useRouter } from "expo-router";

export default function ProfileScreen() {

    // Nháp
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await serverApi.get('/api/profile');
                setUser(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch profile. Please try again.');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Du lieu tinh cho giao dien
    const userData = {
        name: "Le Van Quoc Huy",
        role: "UX/UI Designer",
        avatar: "https://imgcdn.stablediffusionweb.com/2024/10/23/b46077a4-c646-44b6-954a-be6400cde587.jpg",
        hoursSpent: "14h 9m",
        progress: {
            total: 161,
            activity: 40,
            completed: 60,
            upcoming: 61
        },
        courses: {
            inProgress: 7,
            completed: 10,
            upcoming: 12
        }
    }

    const barData = [
        { value: 6.5, label: 'Sun' },
        { value: 4.3, label: 'Mon', frontColor: '#177AD5' },
        { value: 6, label: 'Tue', frontColor: '#177AD5' },
        { value: 8, label: 'Web' },
        { value: 9.3, label: 'Thu', frontColor: '#177AD5' },
        { value: 7.2, label: 'Fri' },
        { value: 6.4, label: 'Sat' },
    ];

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.center}>
                    <Text style={styles.errorText}>Error: {error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!user) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.center}>
                    <Text>No user data available</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Update avt
    // const handleUpdateAvatar = async () => {
    //     try {
    //         let formData = new FormData();

    //         if (Platform.OS === 'web') {
    //             // Dùng input type="file" cho web
    //             const input = document.createElement('input');
    //             input.type = 'file';
    //             input.accept = 'image/*';
    //             input.onchange = async () => {
    //                 if (!input.files || input.files.length === 0) return;
    //                 const file = input.files[0];
    //                 formData.append('avatar', file);

    //                 await uploadAvatar(formData);
    //             };
    //             input.click();
    //         } else {
    //             // Mobile
    //             const result = await ImagePicker.launchImageLibraryAsync({
    //                 mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //                 quality: 1,
    //             });

    //             if (result.canceled || !result.assets.length) {
    //                 console.log('User cancelled or no image selected');
    //                 return;
    //             }

    //             const asset = result.assets[0];
    //             const uri = asset.uri;
    //             const name = uri.split('/').pop();
    //             const type = mime.lookup(uri) || 'image/jpeg';

    //             formData.append('avatar', {
    //                 uri,
    //                 name,
    //                 type,
    //             });

    //             await uploadAvatar(formData);
    //         }
    //     } catch (error) {
    //         console.error('Upload error:', error);
    //     }
    // };

    // const uploadAvatar = async (formData) => {
    //     try {
    //         const response = await serverApi.put('/api/profile', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });

    //         setUser(response.data.data);
    //         console.log('Avatar updated:', response.data.data);
    //     } catch (error) {
    //         console.error('Update failed:', error.response?.data || error.message);
    //     }
    // };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Icon name="arrow-left" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <TouchableOpacity>
                        <Icon name="cog" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* User Info */}
                <View style={styles.userInfoContainer}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: user.avatar_url }}
                            style={styles.avatar}
                        />
                    </View>
                    <Text style={styles.userName}>{user.username}</Text>
                    <Text style={styles.userRole}>{user.email}</Text>

                    {/* Icons: Notifications, Rewards, Edit */}
                    {/* <View style={styles.iconsContainer}>
                        <TouchableOpacity style={styles.iconLabel}>
                            <Icon style={styles.iconButton} name="bell" size={21} color="#000" />
                            <Text style={styles.iconText}>Notifs</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconLabel}>
                            <Icon style={styles.iconButton} name="trophy" size={21} color="#000" />
                            <Text style={styles.iconText}>Rewards</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconLabel}>
                            <Icon style={styles.iconButton} name="edit" size={21} color="#000" />
                            <Text style={styles.iconText}>Edit</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>

                {/* Steve Job */}
                <View style={styles.steveJobsContainer}>
                    <Text style={styles.quoteText}>“Design is not just what it looks like and feels like. Design is how it works”</Text>
                    <Text style={styles.authorText}>Steve Jobs</Text>
                </View>

                {/* Activity Section */}
                <View style={styles.activityContainer}>
                    <View style={styles.activityHeaderContainer}>
                        <Text style={styles.sectionTitle}>Activity</Text>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={styles.dropdownText}>Weekly</Text>
                            <Icon name="chevron-down" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.hoursContainer}>
                        <Text style={styles.hoursText}>{userData.hoursSpent}</Text>
                        <Text style={styles.hoursLabel}>Hours Spents</Text>
                    </View>

                    {/* Bar Chart */}
                    <View style={styles.chartContainer}>
                        <BarChart
                            barWidth={18}
                            noOfSections={4}
                            barBorderRadius={6}
                            frontColor="lightgray"
                            yAxisThickness={0}
                            xAxisThickness={0}
                            spacing={20}
                            isAnimated
                            data={barData}
                        />
                    </View>
                </View>

                {/* Progress Statistics */}
                <View style={styles.progressContainer}>
                    <Text style={styles.sectionTitle}>Progress statistics</Text>
                    <Text style={styles.progressTotal}>
                        {userData.progress.total} <Text style={styles.progressLabel}>Total Activity</Text>
                    </Text>
                    {/* Progress Bars */}
                    <View style={styles.progressBars}>
                        <Progress.Bar
                            progress={userData.progress.activity / 100}
                            width={null}
                            height={8}
                            borderRadius={5}
                            color="#007AFF"
                            unfilledColor="#E0E0E0"
                            borderWidth={0}
                            style={styles.progressBar}
                        />
                        <Text style={styles.progressText}>{userData.progress.activity}</Text>
                    </View>
                    <View style={styles.progressBars}>
                        <Progress.Bar
                            progress={userData.progress.completed / 100}
                            width={null}
                            height={8}
                            borderRadius={5}
                            color="#00e31f"
                            unfilledColor="#E0E0E0"
                            borderWidth={0}
                            style={styles.progressBar}
                        />
                        <Text style={styles.progressText}>{userData.progress.completed}</Text>
                    </View>
                    <View style={styles.progressBars}>
                        <Progress.Bar
                            progress={userData.progress.upcoming / 100}
                            width={null}
                            height={8}
                            borderRadius={5}
                            color="#ff8f00"
                            unfilledColor="#E0E0E0"
                            borderWidth={0}
                            style={styles.progressBar}
                        />
                        <Text style={styles.progressText}>{userData.progress.upcoming}</Text>
                    </View>
                    {/* Course Stats */}
                    <View style={styles.courseStatsContainer}>
                        <View style={styles.statItem}>
                            <Icon name="clock-o" size={40} color="#007AFF" />
                            <Text style={styles.statNumber}>{userData.courses.inProgress}</Text>
                            <Text style={styles.statLabel}>In Progress</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Icon name="check-circle" size={40} color="#34C759" />
                            <Text style={styles.statNumber}>{userData.courses.completed}</Text>
                            <Text style={styles.statLabel}>Completed</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Icon name="calendar" size={40} color="#FF9500" />
                            <Text style={styles.statNumber}>{userData.courses.upcoming}</Text>
                            <Text style={styles.statLabel}>Upcoming</Text>
                        </View>
                    </View>
                </View>

                {/* Invite Friends Section */}
                <View style={styles.inviteContainer}>
                    <View style={{ flex: 0.5, alignItems: "center" }}>
                        <Image
                            style={styles.imageInvite}
                            source={require("../../assets/images/invite.png")}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.inviteHeaderContainer}>
                        <Text style={styles.inviteTitle}>Invite your friends</Text>
                        <Text style={styles.inviteSubtitle}>
                            Tell your friends it's free and fun to learn on Skillzy!
                        </Text>
                        <TouchableOpacity style={styles.inviteButton}>
                            <Text style={styles.inviteButtonText} onPress={() => router.push("../editprofile")}>Invite friends</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff"
    },
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold"
    },
    userInfoContainer: {
        alignItems: "center",
        paddingVertical: 20
    },

    avatarContainer: {
        position: 'relative',
        width: 100,
        height: 100
    },

    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#E0E0E0",
        borderWidth: 3,
        borderColor: '#febc82'
    },

    editAvtButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: "#2e2e2e",
        width: 24,
        height: 24,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white'
    },

    userName: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 15,
        color: "#09a1fe"
    },
    userRole: {
        fontSize: 16,
        color: "#A0A0A0",
        marginTop: 5,
    },
    // iconsContainer: {
    //     flexDirection: "row",
    //     marginTop: 25
    // },
    // iconLabel: {
    //     alignItems: "center",
    //     marginHorizontal: 15,
    // },
    // iconButton: {
    //     padding: 14,
    //     borderRadius: 10,
    //     backgroundColor: "#dddede"
    // },
    // iconText: {
    //     fontSize: 11.5,
    //     color: "#858585",
    //     marginTop: 5,
    //     fontWeight: "bold"
    // },
    steveJobsContainer: {
        marginHorizontal: 20,
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
    },
    quoteText: {
        fontSize: 16,
        color: "#002950",
        marginTop: 12,
        marginHorizontal: 12,
        textAlign: 'center',
        fontWeight: "600"
    },
    authorText: {
        fontSize: 15,
        color: "#757575",
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 12,
        fontWeight: "600"
    },

    activityContainer: {
        marginTop: 20,
        marginHorizontal: 20,
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
    },
    activityHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold"
    },
    dropdown: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8
    },
    dropdownText: {
        color: "#fff",
        fontSize: 14,
        marginRight: 10
    },
    hoursContainer: {
        alignItems: "center",
        marginTop: 5
    },
    hoursText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#002357"
    },
    hoursLabel: {
        fontSize: 16,
        paddingHorizontal: 16,
        color: "#002357"
    },

    // Chart
    chartContainer: {
        marginTop: 10,
        padding: 5
    },
    progressContainer: {
        marginHorizontal: 20,
        marginTop: 30,
        padding: 20,
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
    },
    progressTotal: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
    },
    progressLabel: {
        fontSize: 16,
        color: "#A0A0A0",
    },
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
    courseStatsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
    },
    statItem: {
        alignItems: "center",
        padding: 12,
        borderRadius: 5,
        paddingVertical: 25,
        backgroundColor: "#f7fcff",
    },
    statNumber: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 5,
    },
    statLabel: {
        fontSize: 14,
        color: "#A0A0A0",
        marginTop: 5,
    },


    inviteContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 30,
        padding: 20,
        backgroundColor: "#003d65",
        borderRadius: 10,
    },
    imageInvite: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    inviteHeaderContainer: {
        flex: 1,
        alignItems: "center"
    },
    inviteTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    inviteSubtitle: {
        fontSize: 14,
        color: "#fff",
        marginTop: 5,
        textAlign: "center",
    },
    inviteButton: {
        marginTop: 15,
        backgroundColor: "#049cff",
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    inviteButtonText: {
        fontSize: 15,
        color: "#fff",
        paddingHorizontal: 5
    },
})