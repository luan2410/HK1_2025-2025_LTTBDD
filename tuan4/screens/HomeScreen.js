// screens/HomeScreen.js
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';


const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chào mừng đến với ứng dụng!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
    },
});

export default HomeScreen;
