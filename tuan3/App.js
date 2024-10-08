import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


  import screen1 from './screens/screen1';
  import screen2 from './screens/screen2'
  import screen3 from './screens/screen3'
  const stack =createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <stack.Navigator initialRouteName='Screen_01' screenOptions={{headerShown: false}}>
        <stack.Screen name="screen1" component={screen1} />
        <stack.Screen name="screen2" component={screen2} />
        <stack.Screen name="screen3" component={screen3} />
      </stack.Navigator>
    </NavigationContainer>
  );
}


