// App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen'; // Màn hình đăng nhập
import screen1 from './screens/screen1'; // Màn hình 1
import screen2 from './screens/screen2'; // Màn hình 2
import screen3 from './screens/screen3'; // Màn hình 3

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="screen1" component={screen1} />
        <Stack.Screen name="screen2" component={screen2} />
        <Stack.Screen name="screen3" component={screen3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
