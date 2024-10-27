import { StyleSheet, Text, View,Image, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FlatList } from 'react-native';

// const category =[
//     {key:1 , name: 'resort', image:require("../assets/DATA/resort.png")},
//     {key:2 , name: 'Homestay', image:require("../assets/DATA/homestay.png")},
    
//     {key:3 , name: 'resort', image:require("../assets/DATA/resort.png")},
//     {key:4 , name: 'Homestay', image:require("../assets/DATA/homestay.png")},
//     {key:5 , name: 'resort', image:require("../assets/DATA/resort.png")},
//     {key:6 , name: 'Homestay', image:require("../assets/DATA/homestay.png")},
//     {key:7 , name: 'resort', image:require("../assets/DATA/resort.png")},
//     {key:8 , name: 'Homestay', image:require("../assets/DATA/homestay.png")},
    

// ];
// const Location =[
//     {key:1 , image: require("../assets/DATA/photo1.png")},
//     {key:2 , image: require("../assets/DATA/photo2.png")},
//     {key:3 , image: require("../assets/DATA/photo1.png")},
//     {key:4 , image: require("../assets/DATA/photo2.png")},
//     {key:5 , image: require("../assets/DATA/photo1.png")},
//     {key:6 , image: require("../assets/DATA/photo2.png")},
    

// ]

export default function Screen1() {
    const [location,setLocation] = useState([
        
    ]);
    const [category,setCategoryData] = useState([
     {key:1 , name: 'resort', image:require("../assets/DATA/resort.png")},
    {key:2 , name: 'Homestay', image:require("../assets/DATA/homestay.png")},
    
    {key:3 , name: 'resort', image:require("../assets/DATA/resort.png")},
    {key:4 , name: 'Homestay', image:require("../assets/DATA/homestay.png")},
    {key:5 , name: 'resort', image:require("../assets/DATA/resort.png")},
    {key:6 , name: 'Homestay', image:require("../assets/DATA/homestay.png")},
    {key:7 , name: 'resort', image:require("../assets/DATA/resort.png")},
    {key:8 , name: 'Homestay', image:require("../assets/DATA/homestay.png")},
    ]);
    useEffect(() => {
        fetch('https://671d375209103098807c92ae.mockapi.io/Category')
          .then((response) => response.json())
          .then((json) => setCategoryData(json))
          .catch((error) => console.error(error));
      }, []);
      useEffect(() => {
        fetch('https://671d375209103098807c92ae.mockapi.io/Location')
          .then((response) => response.json())
          .then((json) => setLocation(json))
          .catch((error) => console.error(error));
      }, []);

  const rendercate = ({item}) => (
    <View style={{alignItems: 'center', margin: 3}} >
        <Image source={item.image } />
        <Text style={{fontWeight: 'bold',fontSize:16}}>{item.name}</Text>
    </View>
  );
  const renderDes = ({item}) =>(
        <View style={{padding:10}}>
            <Image source={item.image} style={{width:90, height:90 , borderRadius: 20}} />
        </View>
  )
  const renderRecommen =({item}) =>(
    <View style={{margin:10}}>
        <Image source={item.image} style={{width:140, height:140, borderRadius: 10}} />
    </View>
  )
  return (
    <ScrollView>
    <View style={styles.contaiter}>
      <View style={{backgroundColor:'#5958b2', alignItems:'center', justifyContent: 'center',}}>
            <View style={styles.ipheader}>
                    <Image source={require("../assets/DATA/logoicon.png")} style={styles.img} ></Image>
                    <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor:'white', paddingLeft: 5,borderRadius:7, width:'90%' }}>
                        <TextInput placeholder='Search here' style={{justifyContent:'center', backgroundColor:'white', width:"90%"}} />
                        <Image source={require("../assets/DATA/findicon.png")}  />
                    </View>
            </View>
            <View style={  styles.ipheader}>
                <Image source={require("../assets/DATA/personicon.png")} style={styles.img} />
                <View style={{alignSelf:'flex-start',width:'85%'}}>
                    <Text style={{color:'white', fontSize:18, fontWeight: 'bold',}}>Wellcome</Text>
                    <Text style={{color:'white', fontSize:11,} }>Dooma Strouple</Text>
                </View>
                <Image source={require("../assets/DATA/profileicon.png")} style={{width:30,height:30,borderRadius:23,}} />
            </View>
     </View>
            <View style={{marginLeft:50,marginRight:20}} >
                <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                    <Text style={{fontWeight: 'bold',fontSize: 20}}>category</Text>
                    <Image source={require("../assets/DATA/3gach.png")} style={styles.img} />
                </View>
                
                <FlatList 
                    data={category}
                    renderItem={rendercate}
                    keyExtractor={item =>item.id}
                    numColumns={4}
                    contentContainerStyle={{flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'space-between'}}
                 />
            </View>
            
            <View style={{marginLeft:50,marginRight:20}} >
                <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                    <Text style={{fontWeight: 'bold',fontSize: 20}}>Location</Text>
                    <Image source={require("../assets/DATA/3gach.png")} style={styles.img} />
                </View>
                <FlatList 
                   data={location}
                   renderItem={renderDes}
                   keyExtractor={item => item.id}
                  horizontal
                 />
            </View>

            <View style={{marginLeft:50,marginRight:20}} >
                <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 20}}>Recommended</Text>
                    <Image source={require("../assets/DATA/3gach.png")} style={styles.img} />
                </View>
                <FlatList 
                   data={location}
                   renderItem={renderRecommen}
                   keyExtractor={item => item.id}
                  horizontal
                 />
            </View>

    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    contaiter:{
        flex:1,
    }
    ,
    img:{
        width:38, height: 38, borderRadius:20
    }
    ,
    ipheader:{flexDirection: 'row',width:300, marginBottom:20,  alignContent:'center' , paddingTop: 10}
})