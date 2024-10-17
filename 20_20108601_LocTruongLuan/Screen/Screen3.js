import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { color } from 'react-native-elements/dist/helpers'
import { useState } from 'react'
export default function Screen3({navigation,route}) {
    const { userInfo } = route.params; // This gets the user info passed from Screen2
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
      // Check if the username and email match with the stored userInfo
      if (email === userInfo.Uemail && password === userInfo.Upassword) {
        // Navigate to Screen_04 if credentials match
        navigation.navigate('Screen4');
      } else {
        alert('Invalid login details!');
      }
    }
  return (
    <View style={styles.container}>
        <View style={styles.view1} >
                <Image source={require('../assets/DATA/Image20.png')} style={{width:'100%',}} />
        </View>
        <View style={styles.view2} >
            <Text style={{fontSize:30,fontWeight: 'bold',color:'black', alignSelf: 'flex-start',marginLeft:20}}>
                WellCome!
            </Text>
            <Text style={{marginTop: 50,fontWeight: 'bold', alignSelf: 'flex-start',marginLeft:20}}>
                Email
            </Text>
            <View style={styles.viewip}>
                <Image source={require('../assets/DATA/Vector.png')} style={styles.img} />
                <TextInput placeholder='Enter email' style={styles.ip} value={email} onChangeText={setEmail} />
            </View>
            <Text style={{fontWeight: 'bold', alignSelf: 'flex-start', marginLeft:20 ,}}>
                password
            </Text>
            <View style={styles.viewip}>
                <Image style={styles.img} source={require('../assets/DATA/lock.png')} />
                <TextInput style={styles.ip} placeholder='enter password' secureTextEntry value={password} onChangeText={setPassword} />
                <Image style={styles.img} source={require('../assets/DATA/eye.png')} />
            </View>
        </View>
        <View style={styles.view3}>
            <TouchableOpacity onPress={handleLogin}
            style={{width:'90%', height:50,textAlign: 'center', alignItems: 'center', borderRadius: 20, marginTop:20, backgroundColor: 'aqua', justifyContent: 'center',marginTop: 100}}
             >
                    <Text style={{color: 'white' , fontWeight: 'bold',}}>
                        Login
                    </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    view1:{
        flex:3,
    }
    ,
    view2:{
        flex:3,
        flexDirection: 'column',
        marginLeft:10,
        alignItems: 'center',   

    }
    , view3:{
        flex:3,
        marginTop: "10%",
        marginLeft: 10, 
        alignItems: 'center',
    },
    viewip:{
        width:'90%',
        height: 50,
        backgroundColor:'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 15,
    },
    ip:{
        width: '85%',
        height: '90%',
        marginRight: 5,
    },
    img:{
        width: '5%',
        height: '40%',
    }
})