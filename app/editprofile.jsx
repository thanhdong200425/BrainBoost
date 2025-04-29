import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/FontAwesome"
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import FormFieldEdit from '../components/containers/FormFieldEdit';
import { useRouter } from "expo-router";
import serverApi from '../helpers/axios';
import * as ImagePicker from 'expo-image-picker'
import Toast from 'react-native-toast-message';
import { getProfile, updateProfile, updateAvatar } from '../services/profileService';

export default function EditProfile() {
    const router = useRouter()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        dob: '',
        avatar_url: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userData = await getProfile();
                setUser(userData);
                setFormData({
                    username: userData.username || '',
                    email: userData.email || '',
                    dob: userData.dob || '',
                    avatar_url: userData.avatar_url || '',
                });
                setLoading(false);
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
            const { username, email, dob } = formData;
            const updatedUser = await updateProfile({ username, email, dob });
            setUser(updatedUser);
            Toast.show({
                type: 'success',
                text1: 'Profile Updated',
                text2: 'Your profile has been updated successfully!',
                position: 'top',
            });
            router.replace('/(tabs)/profile');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Update Error',
                text2: error.message || 'Failed to update profile. Please try again.',
                position: 'top',
            });
        }
    };

    const handleUpdateAvatar = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Toast.show({
                    type: 'error',
                    text1: 'Permission Denied',
                    text2: 'Permission to access media library is required.',
                    position: 'top',
                });
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                allowsEditing: true,
                aspect: [1, 1],
            });

            if (result.canceled) {
                return;
            }

            const imageUri = result.assets[0].uri;
            const updatedUser = await updateAvatar(imageUri);
            setUser(updatedUser);
            setFormData(prev => ({
                ...prev,
                avatar_url: updatedUser.avatar_url,
            }));
            Toast.show({
                type: 'success',
                text1: 'Avatar Updated',
                text2: 'Your avatar has been updated successfully!',
                position: 'top',
            });
            router.replace('/(tabs)/profile');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Avatar Update Error',
                text2: error.message || 'Failed to update avatar. Please try again.',
                position: 'top',
            });
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