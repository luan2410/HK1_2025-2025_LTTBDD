import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon

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
      screenOptions={({ route }) => ({
        headerShown: false, // Ẩn tiêu đề của từng tab
        tabBarStyle: { backgroundColor: '#f8f9fa' }, // Thiết kế tab bar
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Tương ứng với từng tab
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Feed') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Library') {
            iconName = focused ? 'library' : 'library-outline';
          }

          // Trả về Icon
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1DB954', // Màu khi tab được chọn
        tabBarInactiveTintColor: 'gray', // Màu khi tab không được chọn
      })}
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
          options={{ title: 'Register' }}
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
