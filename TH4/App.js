import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen1 from './Screen/Screen1';
  

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Screen1'
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
        <Tab.Screen name='Screen1' component={Screen1} />
        <Tab.Screen name='exploreicon' component={Screen1} />
        <Tab.Screen name='searchicon' component={Screen1} />
        <Tab.Screen name='profileicon' component={Screen1} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});