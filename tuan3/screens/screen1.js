import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function App({navigation}){
    return(
        <View style={styles.container}>
            <View style={styles.style1}>
                <Text style={{
                    color: 'green',
                    fontSize: 30,
                    fontWeight: 'bold'
                }}>Order your favourite!</Text>
            </View>

        <View style={styles.style2}>

            <Image source={require('../assets/data/Image_96.png')}
                style={{width: 150, height: 150, marginLeft: 215}}
            />

            <Image source={require('../assets/data/Image 95.png')}
                style={{width: 150, height: 150, marginLeft: 20, marginTop: -25}}
            />

            <Image source={require('../assets/data/Image 97.png')}
                style={{width: 150, height: 150, marginLeft: 0, marginTop: 30, marginLeft: 200}}
            />
        </View>

        <View style={styles.style3}>
            <TouchableOpacity style={{
                backgroundColor: 'green',
                borderRadius: 40,
                width: 240,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={() => {navigation.navigate("screen2")}}
            >
                <Text style={{fontSize: 20 , color: 'white'}}>
                    Get Started
                </Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    style1:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    style2:{
        flex: 3,
        backgroundColor: '#fff',
    },

    style3:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
})