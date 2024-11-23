import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen1 from './Screen/Screen1';
import Screen3 from './Screen/Screen3';
import Screen2 from './Screen/Screen2';
import Screen4 from './Screen/Screen4';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import { AuthProvider } from './Screen/truyenDuLieu';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Screen1"
      screenOptions={({ route }) => ({
        headerShown: false, // Ẩn tiêu đề cho tất cả các màn hình
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Screen1') {
            iconName = require('./assets/DATA/homeicon.png');
          } else if (route.name === 'exploreicon') {
            iconName = require('./assets/DATA/exploreicon.png');
          } else if (route.name === 'searchicon') {
            iconName = require('./assets/DATA/searchicon.png');
          } else if (route.name === 'profileicon') {
            iconName = require('./assets/DATA/profileicon.png');
          }
          return <Image source={iconName} style={{ width: 30, height: 30 }} />;
        },
        tabBarStyle: {
          backgroundColor: '#5958b2',
          height: 70,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Screen1" component={Screen1} />
      <Tab.Screen name="exploreicon" component={Screen2} />
      <Tab.Screen name="searchicon" component={Screen3} />
      <Tab.Screen name="profileicon" component={Screen4} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
   <NavigationContainer>
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer></AuthProvider>
   
  );
}

const styles = StyleSheet.create({});
