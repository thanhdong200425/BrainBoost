import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/FontAwesome"
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import FormFieldEdit from '../components/containers/FormFieldEdit';
import { useRouter } from "expo-router";
import serverApi from '../helpers/axios';
import * as ImagePicker from 'expo-image-picker'

export default function EditProfile() {
    const router = useRouter()

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        dob: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await serverApi.get('/api/profile');
                const userData = response.data.data;
                setUser(userData);
                setFormData(prev => ({
                    ...prev,
                    username: userData.username || '',
                    email: userData.email || '',
                    dob: userData.dob || '',
                }));
                setLoading(false)
            } catch (err) {
                setError(err.message || 'Failed to fetch profile. Please try again.');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateProfile = async () => {
        try {
            const { username, dob, avatar_url } = formData;

            console.log('formData:', formData);
            const response = await serverApi.put('/api/profile', {
                username,
                dob,
                avatar_url,
            });

            if (response.status === 200) {
                alert('Profile updated successfully!');
            } else {
                alert('Failed to update profile.');
            }
        } catch (error) {
            console.error("Update error:", error?.response?.data || error.message);
            alert('Failed to update profile. Please try again later.');
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View>
                    <Text>Error: {error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!user) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View>
                    <Text>No user data available</Text>
                </View>
            </SafeAreaView>
        );
    }

    const handleUpdateAvatar = async () => {
        try {
            // Xin quyền truy cập thư viện ảnh
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access media library is required')
                return
            }

            // Open thu vien anh
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                allowsEditing: true,
                aspect: [1, 1]
            })

            if (result.canceled) {
                console.log('User cancelled image picker');
                return;
            }

            const imageUri = result.assets[0].uri;

            const response = await serverApi.put(
                '/api/profile',
                { avatar_url: imageUri },
            );

            const updatedUser = response.data.data;

            setUser(updatedUser);
            setFormData((prev) => ({
                ...prev,
                avatar_url: updatedUser.avatar_url,
            }));

            console.log('Avatar updated:', response.data.data);
            router.replace('/(tabs)/profile')
        } catch (err) {
            console.error('Update avatar error:', err);
            setError(err.message || 'Failed to update avatar.');
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Icon name="arrow-left" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Edit Profile</Text>
                    <TouchableOpacity onPress={handleUpdateProfile}>
                        <Icon name="check" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.profileImageContainer}>
                    <Image
                        source={{ uri: user.avatar_url }}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.cameraButton} onPress={handleUpdateAvatar}>
                        <Ionicons name="camera" size={16} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>
                    <FormFieldEdit
                        label="User name"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <FormFieldEdit
                        label="Email address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        prefix="@"
                    />
                    <FormFieldEdit
                        label="Date of birth"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 20,
        paddingBottom: 80,
        backgroundColor: '#fff',
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
    profileImageContainer: {
        alignSelf: 'center',
        marginBottom: 30,
        position: 'relative',
    },
    profileImage: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 2,
        borderColor: '#e8e8e8',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#1890ff',
        borderRadius: 12,
        padding: 4,
    },
    formContainer: {
        width: '100%',
    },
});