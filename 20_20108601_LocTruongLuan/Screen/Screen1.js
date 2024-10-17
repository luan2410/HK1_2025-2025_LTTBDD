import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function Screen1({navigation}) {
  return (
    <View style={styles.container}>
        <View style={styles.view1}>
            <Image source={require('../assets/DATA/Container17.png')} />
        </View>
        <View style={styles.view2}>
            <Text style={{ fontSize:25 , fontWeight: 'bold',textAlign: 'left' }}>Boost Productivity</Text>
            <Text style={{color:'gray', textAlign: 'left', marginTop:5, marginBottom:5}} > Simplilfy taks, boost productivity</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Screen2')} 
             style={{width:'90%', height:40, backgroundColor:'#00ffff',textAlign: 'center', alignItems: 'center',justifyContent: 'center', borderRadius: 20, marginTop:15}}>
                <Text>
                    Sign up
                </Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate('Screen3') }
            style={{width:'90%', height:20,textAlign: 'center', alignItems: 'center', borderRadius: 20, marginTop:10}}>
                <Text>
                    Login
                </Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent: 'center', marginRight:25, marginTop: 5}}>
                <View style={[styles.dot]}></View>
                <View style={[styles.dot, styles.dot1]}></View>
                <View style={[styles.dot]}></View>
            </View>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',

    },
    view1 :{
        flex:11,
        alignItems: 'center',
    }
    ,view2:{
        flex:4,
        marginLeft: 20,
    }
    , dot:{
        width :10,
        height:10,
        borderRadius :5,
        marginRight: 10,
        borderWidth :1,
        borderColor: '#00ffff',
    }
    , dot1:{
        backgroundColor: '#00ffff'
    }
    , 

})