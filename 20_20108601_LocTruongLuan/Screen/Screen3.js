import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Screen4 from './Screen4'
import { color } from 'react-native-elements/dist/helpers'

export default function Screen3({navigation}) {

  return (
    <View style={styles.container}>
        <View style={styles.view1} >
                <Image source={require('../assets/DATA/Image20.png')} style={{width:'100%',}} />
        </View>
        <View style={styles.view2} >
            <Text style={{fontSize:30,fontWeight: 'bold',color:'black'}}>
                WellCome!
            </Text>
            <Text style={{marginTop: 50,fontWeight: 'bold',}}>
                Email
            </Text>
            <View style={styles.viewip}>
                <Image source={require('../assets/DATA/Vector.png')} style={styles.img} />
                <TextInput placeholder='Enter email' style={styles.ip}/>
            </View>
            <Text style={{fontWeight: 'bold',}}>
                password
            </Text>
            <View style={styles.viewip}>
                <Image style={styles.img} source={require('../assets/DATA/lock.png')} />
                <TextInput style={styles.ip} placeholder='enter password' secureTextEntry />
                <Image style={styles.img} source={require('../assets/DATA/eye.png')} />
            </View>
        </View>
        <View style={styles.view3}>
            <TouchableOpacity onPress={()=> navigation.navigate('Screen4') }
            style={{width:'90%', height:50,textAlign: 'center', alignItems: 'center', borderRadius: 20, marginTop:20, backgroundColor: 'aqua', justifyContent: 'center',marginTop: 100}}
             >
                    <Text style={{color: 'white'}}>
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
        marginLeft:10

    }
    , view3:{
        flex:3,
        marginTop: "10%",
        marginLeft: 10
    },
    viewip:{
        width:'95%',
        height: 50,
        backgroundColor:'gray',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 15
    },
    ip:{
        width: '85%',
        height: '90%',
        marginRight: 5,
    },
    img:{
        width: '7%',
        height: '40%',
    }
})