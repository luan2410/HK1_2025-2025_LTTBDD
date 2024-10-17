import { StyleSheet, Text, View , Image, TextInput} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function Screen2({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.view1}>
            <Image source={require('../assets/DATA/Image19.png')} />
            <Text style={{fontSize:25 , fontWeight: 'bold',textAlign: 'left'}}>Nice to see you!</Text>
            <Text style={{color:'gray', textAlign: 'left', marginTop:5, marginBottom:5}}>creat your account</Text>
      </View>
      <View style={styles.view2}>
            <View style={styles.viewip}>
                <Image source={require('../assets/DATA/codicon_account.png')} style={styles.img}/>
                <TextInput placeholder='enter your usser name' style={styles.ipBox}  ></TextInput>
            </View>
            <View style={styles.viewip}>
                <Image source={require('../assets/DATA/Vector.png')} style={styles.img}/>
                <TextInput placeholder='Enter your email address' style={styles.ipBox} ></TextInput>
            </View>
            <View style ={styles.viewip}>
                <Image source={require('../assets/DATA/lock.png')} style={styles.img} />
                <TextInput placeholder='Enter your password' style={styles.ipBox} ></TextInput>
                <Image source={require('../assets/DATA/eye.png')} style={styles.img} />
            </View>
            
            
            <Text style={{alignSelf: 'flex-start', marginLeft:22, marginBottom:10}}> I agree with tems & Conditions</Text>
            <TouchableOpacity 
                onPress={()=> navigation.navigate('Screen3')} 
                style={{width:'90%', height:50,textAlign: 'center', alignItems: 'center', borderRadius: 20, marginTop:20, backgroundColor: 'aqua', justifyContent: 'center'}}
                    >
                    <Text style={{color:'white'}}>Continue</Text>
            </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex :1,
    }
    ,
    view1:{
        flex:3,
        alignItems: 'center',
        paddingTop: 100,

    },
    view2:{
        flex:6,
        alignItems : 'center',
    },
    viewip:{
        borderWidth:1,
        borderColor:'gray',
        width: '90%',
        height: 50,
        marginBottom: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ipBox:{
        width: '85%'
        ,marginLeft:5,
        height:'95%'

    }
    , img:{
        width: '7%',
        height: '40%',
        margin: 5
    }
})