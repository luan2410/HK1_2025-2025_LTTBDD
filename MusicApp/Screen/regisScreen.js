import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ImageBackground, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

export default function RegisScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (!username || !password || !email) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Invalid email format');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/register', { username, password, email });
            Alert.alert('Success', 'Registration successful! Please log in.');
            navigation.navigate('Login');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                Alert.alert('Error', 'Username or email already exists.');
            } else {
                Alert.alert('Error', 'Something went wrong. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/all_images/Launch Screen/login.png')}
            resizeMode="cover"
            style={styles.background}
        >
            {/* Nút Quay Về */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={require('../assets/all_images/icons/back.png')} // Đường dẫn đến icon mũi tên
                    style={styles.backIcon}
                />
            </TouchableOpacity>

            <View style={styles.overlay}>
                <Text style={styles.title}>Create Account</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#ddd"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#ddd"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#ddd"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    onPress={handleRegister}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Register</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Already have an account? Log in</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute', // Nút tuyệt đối, không chiếm layout
        top: 40, // Khoảng cách từ trên xuống
        left: 20, // Khoảng cách từ trái vào
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền đen mờ
        borderRadius: 20, // Nút tròn
    },
    backIcon: {
        width: 20,
        height: 20,
        tintColor: '#fff', // Icon màu trắng
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: '#fff',
    },
    button: {
        width: '100%',
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonDisabled: {
        backgroundColor: '#b0c4de',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    link: {
        color: '#00BFFF',
        marginTop: 10,
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});
