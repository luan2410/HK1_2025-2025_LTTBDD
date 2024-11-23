import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/accounts');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const accounts = await response.json();
      const user = accounts.find(
        (acc) => acc.user === username && acc.password === password
      );
  
      if (user) {
        Alert.alert('Đăng nhập thành công!', `Xin chào, ${user.user}`);
        navigation.replace('TabNavigator');
      } else {
        Alert.alert('Lỗi đăng nhập', 'Tên người dùng hoặc mật khẩu không đúng');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể kết nối tới server');
    }
  };

  return (
    <View style={styles.container1}>
      <Image source={require('../assets/DATA/photo2.png')} style={{width:"100%",height:'40%'}} />
      <View style={styles.container}>
        <Text style={styles.title}>Đăng nhập</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên người dùng"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Đăng nhập" onPress={handleLogin} />

        <View style={styles.registerButton}>
          <Button
            title="Đăng ký"
            onPress={() => navigation.navigate('RegisterScreen')}
            color="blue"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container1: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  registerButton: {
    marginTop: 20,
  },
});
