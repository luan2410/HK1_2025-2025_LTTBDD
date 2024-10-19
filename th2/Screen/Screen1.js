import { StyleSheet, Text, View , Image ,TextInput} from 'react-native'
import React, { useState } from 'react'

import { TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';

 const listuser =[
    {id:1 ,email :'luan@gmail.com' , matkhau: '123' },
    {id:2 ,email :'luan2@gmail.com' , matkhau: '123' },
    {id:3 ,email :'luan3@gmail.com' , matkhau: '123' },
    {id:4 ,email :'luan4@gmail.com' , matkhau: '123' },
    {id:5 ,email :'luan5@gmail.com' , matkhau: '123' },
    
 ];
export default function Screen1({navigation}) {
    
    const [email,setemail] = useState('');
    const [pass,setpass] = useState('');
    // kiểm tra đăng nhập
    const checklogin =() =>{
        const user = listuser.find(
            (user) => user.email == email && user.matkhau == pass
        );
        console.log('Email:', email);
        console.log('Password:', pass);
        if(user){
            navigation.navigate('Screen2');
        }
        else{
            Alert.alert('Mật khẩu hoặc tài khoản không đúng');
        }
    };


  return (
        <View style={styles.container}>
            <View >
                <Image source={require('../assets/Data/icon.png')} style={{alignSelf:'center'}} />
                <Text style={styles.txt1}> Hello again!</Text>
                <Text style={styles.txtn}>log into your account</Text>
            </View>
            <View >
                <View style={styles.viewip }>
                    <Image source={require('../assets/Data/Vector.png')}/>
                    <TextInput placeholder='Enter your email address' style={styles.ip} value={email} onChangeText={setemail} />
                </View>
                <View style={styles.viewip}>
                    <Image source={require('../assets/Data/lock.png')}/>
                    <TextInput placeholder='Enter your email password' style={styles.ip} value={pass} onChangeText={setpass} secureTextEntry/>
                </View>
                <Text style={{marginTop: 5 , alignSelf:'flex-end', color: 'aqua', fontSize: 15}}>Forgot password?</Text>
                <TouchableOpacity onPress={checklogin} style={styles.button} >
                    <Text style={{color: 'white', fontWeight: 'bold',}}>Continue</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.txtn}>or</Text>
                    <View style={{marginTop: 25, flexDirection: 'row', justifyContent: 'center'}}>
                        <Image source={require('../assets/Data/google.png')}/>
                        <Image source={require('../assets/Data/face.png')}/>
                        <Image source={require('../assets/Data/apple.png')}/>
                    </View>
                </View>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
        container:{
            margin: 10,
            flex:1,
            alignItems: 'center',
            justifyContent:"center"
        },
        txt1:{
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom:5,
            alignSelf:'center',
        },
        txtn:{
            color:'gray',
            alignSelf: 'center',
        }
        ,
         viewip:{
            borderWidth: 1,
            borderRadius: 8,
            width:'100%',
            height: 40,
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
           paddingLeft:  10,
         }
         ,button:{
            borderRadius: 8,
            width:'100%',
            height: 40,
            marginTop: 40,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor:'aqua',
            marginBottom: 50,
            justifyContent: 'center',
         }
         ,
          ip:{
            fontSize:  20,
            color: 'gray',
            marginLeft: 5,
            borderWidth: 0,
            height: 40,
            width:300,

          }
})