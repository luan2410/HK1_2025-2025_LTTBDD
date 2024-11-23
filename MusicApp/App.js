import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, Button } from 'react-native';

// Import các màn hình
import LaunchScreen from './Screen/launchScreen';
import LoginScreen from './Screen/loginScreen';
import RegisScreen from './Screen/regisScreen';
import HomeScreen from './Screen/homeScreen';
import SearchScreen from './Screen/searchScreen';
import FeedScreen from './Screen/feedScreen';
import PlaylistScreen from './Screen/playlistScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Ẩn tiêu đề của từng tab
        tabBarStyle: { backgroundColor: '#f8f9fa' }, // Thiết kế tab bar
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Library" component={PlaylistScreen} />
    </Tab.Navigator>
  );
}

// Root Stack Navigator
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Launch">
        {/* Màn hình Launch */}
        <Stack.Screen
          name="Launch"
          component={LaunchScreen}
          options={{ headerShown: false }} // Ẩn tiêu đề
        />
        {/* Màn hình Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        {/* Màn hình Register */}
        <Stack.Screen
          name="Register"
          component={RegisScreen}
          options={{ headerShown: false }}
        />
        {/* Màn hình Home Tabs */}
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }} // Ẩn tiêu đề của Tab
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
