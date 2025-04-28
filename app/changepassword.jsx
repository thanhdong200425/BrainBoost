import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import FormFieldEdit from '../components/containers/FormFieldEdit';
import { useRouter } from 'expo-router';
import { changePassword } from '../services/authService'; 
import Toast from 'react-native-toast-message';

const PasswordToggle = ({ show, onToggle }) => (
    <TouchableOpacity onPress={onToggle} style={styles.eyeIcon}>
        <Ionicons name={show ? 'eye-off' : 'eye'} size={20} color="#666" />
    </TouchableOpacity>
);

export default function ChangePassword() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const { current_password, new_password } = formData;
    
        if (!current_password || !new_password) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Please fill in both current password and new password.',
            });
            return false;
        }
    
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(new_password)) {
            Toast.show({
                type: 'error',
                text1: 'Weak Password',
                text2: 'Password must be at least 8 characters, include a number and a special character.',
            });
            return false;
        }
        return true;
    };

    const handleUpdatePassword = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const { current_password, new_password } = formData;
            await changePassword(current_password, new_password);

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Password updated successfully!',
            });
            router.back();
        } catch (error) {
            console.error("Update password error:", error.message);
            Toast.show({
                type: 'error',
                text1: 'Update Failed',
                text2: error.message || 'Failed to update password. Please try again later.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView 
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Icon name="arrow-left" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Change Password</Text>
                    <TouchableOpacity onPress={handleUpdatePassword} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#000" />
                        ) : (
                            <Icon name="check" size={24} color="#000" />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>
                    <FormFieldEdit
                        label="Current Password"
                        name="current_password"
                        type={showPassword ? "text" : "password"}
                        value={formData.current_password}
                        onChange={handleChange}
                        suffix={<PasswordToggle show={showPassword} onToggle={togglePasswordVisibility} />}/>

                    <FormFieldEdit
                        label="New Password"
                        name="new_password"
                        type={showPassword ? "text" : "password"}
                        value={formData.new_password}
                        onChange={handleChange}
                        suffix={<PasswordToggle show={showPassword} onToggle={togglePasswordVisibility} />}/>
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
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    formContainer: {
        width: '100%',
        marginTop: 20,
    },
    eyeIcon: {
        padding: 5,
    },
});
