import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

import { Screen } from 'react-native-screens';

import Screen1 from './Screen/Screen1';
import Screen2 from './Screen/Screen2';
import Screen3 from './Screen/Screen3';
import Screen4 from './Screen/Screen4';
export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Screen1' screenOptions={{headerShown: false}} >
          <Stack.Screen name='Screen1' component={Screen1} />
          <Stack.Screen name='Screen2' component={Screen2}/>
          <Stack.Screen name='Screen3' component={Screen3}/>
          <Stack.Screen name='Screen4' component={Screen4}/>
        </Stack.Navigator>

      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
