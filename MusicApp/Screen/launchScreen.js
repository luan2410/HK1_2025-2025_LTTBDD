import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';

const LaunchScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/all_images/Launch Screen/Image30.png')} // Đường dẫn tới hình nền
      style={styles.container}
    >
      <View style={styles.overlay}>
        {/* Logo */}
        <Image
          source={require('../assets/all_images/Launch Screen/Image33.png')}
          style={styles.logo}
        />

        {/* Tagline */}
        <Image
          source={require('../assets/all_images/Launch Screen/Your musicYour artists.png')}
          style={styles.tagline}
        />

        {/* Nút Đăng ký */}
        <TouchableOpacity
          style={[styles.button, styles.blackButton]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={[styles.buttonText, styles.whiteText]}>
            Create an account
          </Text>
        </TouchableOpacity>

        {/* Nút Đăng nhập */}
        <TouchableOpacity
          style={[styles.button, styles.whiteButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.buttonText, styles.blueText]}>
            I already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Lớp phủ mờ
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  },
  logo: {
    marginBottom: 'auto',
    height: 130,
    width: 130,
  },
  tagline: {
    marginBottom: 20,
  },
  button: {
    justifyContent: 'center',
    height: 50, // Tăng chiều cao nút
    marginBottom: 15,
    width: '80%',
    borderRadius: 25, // Bo tròn hơn
    alignItems: 'center',
    elevation: 5, // Hiệu ứng đổ bóng
  },
  blackButton: {
    backgroundColor: '#000', // Nền đen
  },
  whiteButton: {
    backgroundColor: '#fff', // Nền trắng
    borderWidth: 2,
    borderColor: '#007BFF', // Đường viền xanh nhạt
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  whiteText: {
    color: '#fff', // Chữ trắng
  },
  blueText: {
    color: '#007BFF', // Chữ xanh
  },
});

export default LaunchScreen;
