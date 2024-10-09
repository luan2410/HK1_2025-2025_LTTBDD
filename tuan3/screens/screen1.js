import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function App({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Title  */}
            <View style={styles.style1}>
                <Text style={styles.titleText}>Order your favourite!</Text>
            </View>

            {/* Image*/}
            <View style={styles.style2}>
                <Image
                    source={require('../assets/data/Image_96.png')}
                    style={styles.imageStyle1}
                />
                <Image
                    source={require('../assets/data/Image95.png')}
                    style={styles.imageStyle2}
                />
                <Image
                    source={require('../assets/data/Image97.png')}
                    style={styles.imageStyle3}
                />
                
            </View>

            {/* Button  */}
            <View style={styles.style3}>
                <TouchableOpacity 
                    style={styles.buttonStyle}
                    onPress={() => { navigation.navigate("screen2") }}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
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
    style1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    titleText: {
        color: 'green',
        fontSize: 30,
        fontWeight: 'bold',
    },
    style2: {
        flex: 3,
        backgroundColor: '#fff',
    },
    imageStyle1: {
        width: 150,
        height: 150,
        marginLeft: 215,
    },
    imageStyle2: {
        width: 150,
        height: 150,
        marginLeft: 20,
        marginTop: -25,
    },
    imageStyle3: {
        width: 150,
        height: 150,
        marginLeft: 200,
        marginTop: 30,
    },
    style3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        backgroundColor: 'green',
        borderRadius: 40,
        marginTop: 60,
        width: 240,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
});