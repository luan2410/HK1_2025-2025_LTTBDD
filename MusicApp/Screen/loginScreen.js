import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ImageBackground, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Trạng thái tải

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter both username and password');
            return;
        }

        setIsLoading(true); // Bắt đầu trạng thái tải
        try {
            const response = await axios.post('http://localhost:3000/login', { username, password });
            Alert.alert('Success', `Welcome ${response.data.user.username}`);
            navigation.replace('HomeTabs'); // Điều hướng đến HomeTabs
        } catch (error) {
            setIsLoading(false); // Dừng trạng thái tải
            if (error.response && error.response.status === 401) {
                // Sai mật khẩu
                Alert.alert('Invalid Login', 'Incorrect password. Please try again.');
            } else if (error.response && error.response.status === 404) {
                // Không tìm thấy tài khoản
                Alert.alert('Invalid Login', 'Account not found. Please check your username.');
            } else {
                // Lỗi khác
                Alert.alert('Error', 'Something went wrong. Please try again later.');
            }
        }
    };

    return (
        <ImageBackground
            source={require('../assets/all_images/Launch Screen/login.png')} // URL hình nền
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
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#ddd"
                    value={username}
                    onChangeText={setUsername}
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
                    style={[styles.button, isLoading && styles.buttonDisabled]} // Nút bị vô hiệu khi tải
                    onPress={handleLogin}
                    disabled={isLoading} // Tắt nút khi đang tải
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" /> // Hiển thị trạng thái tải
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}>Don't have an account? Register</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Lớp phủ mờ trên hình nền
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
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Màu nền nhẹ trong suốt
        color: '#fff', // Màu chữ trắng
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
        backgroundColor: '#b0c4de', // Màu xám khi nút bị vô hiệu
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
